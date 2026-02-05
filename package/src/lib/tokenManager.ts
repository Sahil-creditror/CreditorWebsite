/**
 * Token Manager for Zoom Access Tokens
 * Handles fetching, storing, and refreshing access tokens
 */

const TOKEN_STORAGE_KEY = 'zoom_access_token';
const TOKEN_EXPIRY_KEY = 'zoom_token_expiry';
const REFRESH_TOKEN_KEY = 'zoom_refresh_token';

// https://creditor.onrender.com/api
// https://testbackend-hcoy.onrender.com/api
// Get backend base URL from environment or default
const getBackendBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://creditor.onrender.com/api'; // TODO: Change to testbackend-hcoy.onrender.com/api
  }
  return 'https://creditor.onrender.com/api'; // TODO: Change to testbackend-hcoy.onrender.com/api 
};

interface TokenData {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  // Support both snake_case and camelCase from backend
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * Fetch a new access token from the refresh-token API
 */
export async function fetchNewToken(): Promise<string | null> {
  try {
    const backendUrl = getBackendBaseUrl();
    const refreshTokenUrl = `${backendUrl}/zoom/refresh-token`;

    // // Safety check for placeholder URL to avoid CORS errors in browser
    // if (refreshTokenUrl.includes('your-backend-api.com')) {
    //   console.warn('[Token Manager] Placeholder backend URL detected. Skipping token fetch.');
    //   return null;
    // }

    console.log('[Token Manager] Fetching token from:', refreshTokenUrl);

    const response = await fetch(refreshTokenUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('[Token Manager] Failed to fetch new token:', response.status);
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('[Token Manager] Error response:', errorText);
      return null;
    }

    const result = await response.json();
    console.log('[Token Manager] Token response received');

    // Handle direct token response or wrapped response
    const tokenData: TokenData = result.data || result;

    // Support both snake_case (access_token) and camelCase (accessToken)
    const accessToken = tokenData.access_token || tokenData.accessToken;
    const refreshToken = tokenData.refresh_token || tokenData.refreshToken;
    const expiresIn = tokenData.expires_in || tokenData.expiresIn || 3600;

    if (accessToken) {
      // Store access token
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      console.log('[Token Manager] Access token stored');

      // Store refresh token if provided
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        console.log('[Token Manager] Refresh token stored');
      }

      // Calculate and store expiry time (default to 1 hour if not provided)
      const expiryTime = Date.now() + (expiresIn * 1000);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

      console.log('[Token Manager] New token fetched and stored successfully');
      console.log('[Token Manager] Token expires in:', expiresIn, 'seconds');
      return accessToken;
    } else {
      console.error('[Token Manager] No access_token or accessToken in response:', result);
      return null;
    }
  } catch (error) {
    console.error('[Token Manager] Error fetching token:', error);
    return null;
  }
}

/**
 * Get the current access token from localStorage
 */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Check if the stored token is expired
 */
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') return true;

  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryTime) return true;

  const expiry = parseInt(expiryTime, 10);
  const now = Date.now();

  // Consider token expired if it expires in less than 5 minutes
  const bufferTime = 5 * 60 * 1000; // 5 minutes
  return now >= (expiry - bufferTime);
}

/**
 * Get a valid access token, refreshing if necessary
 */
export async function getValidToken(): Promise<string | null> {
  // Check if we have a stored token
  const storedToken = getStoredToken();

  // If token exists and is not expired, return it
  if (storedToken && !isTokenExpired()) {
    console.log('[Token Manager] Using cached token');
    return storedToken;
  }

  // Token is missing or expired, fetch a new one
  console.log('[Token Manager] Token expired or missing, fetching new token');
  return await fetchNewToken();
}

/**
 * Clear all stored tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  console.log('[Token Manager] Tokens cleared');
}

/**
 * Initialize token on app load
 */
export async function initializeToken(): Promise<void> {
  const token = await getValidToken();
  if (token) {
    console.log('[Token Manager] Token initialized successfully');
  } else {
    console.warn('[Token Manager] Failed to initialize token');
  }
}

