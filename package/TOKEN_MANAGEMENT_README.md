# Token Management System

## Overview
This document explains how the Zoom access token management system works, including automatic token refresh and localStorage caching.

## Architecture

### Components

1. **Token Manager** (`src/lib/tokenManager.ts`)
   - Handles all token-related operations
   - Stores/retrieves tokens from localStorage
   - Manages token expiry and automatic refresh

2. **Service Layer** (`src/services/zoom.ts`)
   - Uses token manager to get valid tokens
   - Passes tokens in Authorization headers

3. **API Routes** (`src/app/api/zoom/*`, `src/app/api/webx/*`)
   - Accept tokens from client Authorization headers
   - Fallback to static token if no client token provided

## Token Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      User Opens Register Page                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              initializeToken() is called                     │
│  - Checks localStorage for existing token                    │
│  - If missing or expired, calls backend directly:            │
│    GET {BASE_URL}/zoom/refresh-token                         │
│  - Stores new token in localStorage                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           fetchOccurrences() is called (x3)                  │
│  - Calls getValidToken() to get cached/fresh token           │
│  - Passes token in Authorization header                      │
│  - API route uses client token to call backend               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              User Submits Registration                       │
│  - registerZoomWebinar() calls getValidToken()               │
│  - Token is passed to API route                              │
│  - Backend receives request with valid token                 │
└─────────────────────────────────────────────────────────────┘
```

## Token Manager Functions

### `initializeToken()`
Initializes token on app load. Fetches new token if needed.

```typescript
await initializeToken();
// Token is now ready in localStorage
```

### `getValidToken()`
Returns a valid token, refreshing if necessary.

```typescript
const token = await getValidToken();
// Returns cached token if valid, or fetches new one
```

### `fetchNewToken()`
Fetches a fresh token directly from the backend API.

```typescript
const token = await fetchNewToken();
// Always fetches new token via GET request:
// GET {BASE_URL}/zoom/refresh-token
// Example: GET https://testbackend-hcoy.onrender.com/api/zoom/refresh-token
```

### `isTokenExpired()`
Checks if stored token is expired.

```typescript
if (isTokenExpired()) {
  // Token needs refresh
}
```

### `clearTokens()`
Clears all stored tokens from localStorage.

```typescript
clearTokens();
// All tokens removed from localStorage
```

## localStorage Keys

- `zoom_access_token`: The Zoom access token
- `zoom_refresh_token`: The refresh token (if provided by backend)
- `zoom_token_expiry`: Timestamp when token expires (milliseconds)

## Token Expiry

Tokens are considered expired with a 5-minute buffer:

```typescript
// If token expires at 3:00 PM
// System treats it as expired at 2:55 PM
// This ensures token doesn't expire during API call
const bufferTime = 5 * 60 * 1000; // 5 minutes
return now >= (expiry - bufferTime);
```

## Usage Examples

### In React Components

```typescript
import { initializeToken, getValidToken } from "@/lib/tokenManager";

function MyComponent() {
  useEffect(() => {
    // Initialize token when component mounts
    initializeToken();
  }, []);

  const handleAction = async () => {
    // Get valid token before API call
    const token = await getValidToken();
    
    // Use token in your API call
    const response = await fetch('/api/some-endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };
}
```

### In Service Functions

```typescript
import { getValidToken } from "@/lib/tokenManager";

export const myApiCall = async () => {
  // Get valid token (automatically refreshes if needed)
  const token = await getValidToken();
  
  if (!token) {
    return { success: false, error: "Failed to get token" };
  }

  const response = await fetch('/api/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};
```

### In API Routes

```typescript
export async function POST(request: Request) {
  // Get token from client Authorization header
  const authHeader = request.headers.get("authorization");
  const clientToken = authHeader?.replace("Bearer ", "");
  
  // Use client token, or fallback to static token
  const accessToken = clientToken || STATIC_FALLBACK_TOKEN;
  
  // Use token to call backend API
  const response = await fetch(backendUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}
```

## Error Handling

### Token Fetch Failure

If token fetch fails, the system returns `null`:

```typescript
const token = await getValidToken();

if (!token) {
  // Handle error - show message to user
  return {
    success: false,
    error: "Failed to obtain access token. Please try again."
  };
}
```

### 401 Unauthorized Response

If backend returns 401, token might be invalid:

```typescript
if (response.status === 401) {
  // Clear tokens and fetch new one
  clearTokens();
  const newToken = await fetchNewToken();
  // Retry request with new token
}
```

## Security Considerations

1. **localStorage**: Tokens are stored in browser localStorage
   - Accessible to JavaScript on the same domain
   - Not accessible to other domains
   - Cleared when user clears browser data

2. **HTTPS**: Always use HTTPS in production to protect tokens in transit

3. **Token Expiry**: Tokens have limited lifetime and are automatically refreshed

4. **No Sensitive Data**: Only access tokens are stored, not user credentials

## Debugging

Enable console logging to see token operations:

```javascript
// Token Manager logs:
[Token Manager] New token fetched and stored
[Token Manager] Using cached token
[Token Manager] Token expired or missing, fetching new token
[Token Manager] Tokens cleared

// API Route logs:
[ZOOM] Fetching occurrences: { usingClientToken: true }
[WEBX] Using client-provided access token
```

## Testing

### Test Token Initialization
1. Open register page
2. Check browser console for `[Token Manager] Token initialized successfully`
3. Check localStorage for `zoom_access_token` key
4. Verify token value is stored

### Test Token Usage
1. Open Network tab in DevTools
2. Navigate to register page
3. Look for requests to `/api/zoom/occurrences`
4. Check Request Headers for `Authorization: Bearer {token}`
5. Verify token matches value in localStorage

### Test Token Refresh
1. Manually set `zoom_token_expiry` to past date in localStorage:
   ```javascript
   localStorage.setItem('zoom_token_expiry', '0');
   ```
2. Reload page
3. Verify new token is fetched from `/api/zoom/refresh-token`
4. Check that new expiry time is set

### Test Fallback to Static Token
1. Disable token manager by removing Authorization header
2. Verify API routes still work with static fallback token
3. Check console for `[WEBX] Using static access token`

## Troubleshooting

### "Failed to obtain access token"
- Check if backend `{BASE_URL}/zoom/refresh-token` endpoint is working
- Verify backend URL is correct in `NEXT_PUBLIC_API_BASE_URL` environment variable
- Check browser console for error messages and the exact URL being called
- Verify CORS is enabled on backend for frontend domain

### Token expires too quickly
- Increase buffer time in `isTokenExpired()` function
- Check `expires_in` value returned by backend

### Token not persisting
- Check if localStorage is enabled in browser
- Verify no browser extensions are blocking localStorage
- Check if running in private/incognito mode

## Future Enhancements

1. **Automatic Retry**: Automatically retry failed requests with refreshed token
2. **Token Rotation**: Implement refresh token rotation for better security
3. **Multiple Tokens**: Support different tokens for different API endpoints
4. **Encrypted Storage**: Encrypt tokens before storing in localStorage

