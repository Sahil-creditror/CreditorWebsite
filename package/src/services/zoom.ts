import { getValidToken } from "@/lib/tokenManager";

type ApiResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

const INTERNAL_ROUTES = {
  REGISTER_WEBINAR: "/api/webx/register-webinar",
  REFRESH_TOKEN: "/api/zoom/refresh-token",
  OCCURRENCES: "/api/zoom/occurrences",
} as const;

export interface ZoomWebinarRegistrationPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  webinarId: string;
  occurrence_id?: string;
}

export interface OccurrenceItem {
  occurrence_id: string;
  date: string;
  time: string;
  start_time: string;
}

export interface OccurrencesResponse {
  webinarId: string;
  occurrences: OccurrenceItem[];
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

export interface ZoomWebinarRegistrationResponse {
  registrant_id: string;
  join_url: string;
  start_time?: string;
  topic?: string;
  message?: string;
}

export const registerZoomWebinar = async (
  payload: ZoomWebinarRegistrationPayload
): Promise<ApiResult<ZoomWebinarRegistrationResponse>> => {
  try {
    // Get a valid token from token manager
    const token = await getValidToken();
    
    if (!token) {
      return {
        success: false,
        error: "Failed to obtain access token. Please try again.",
      };
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(INTERNAL_ROUTES.REGISTER_WEBINAR, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || data?.message || "Zoom webinar registration failed",
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data?.message || "Registration successful",
    };
  } catch (error: unknown) {
    console.error("Zoom webinar registration failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to complete webinar registration",
    };
  }
};

export const fetchOccurrences = async (
  webinarId: string
): Promise<ApiResult<OccurrencesResponse>> => {
  try {
    console.log(`\n========== FETCHING OCCURRENCES ==========`);
    console.log(`[Occurrences] Webinar ID: ${webinarId}`);
    
    // Get a valid token from token manager
    const token = await getValidToken();
    
    if (!token) {
      console.error('[Occurrences] Failed to get access token');
      return {
        success: false,
        error: "Failed to obtain access token. Please try again.",
      };
    }

    console.log(`[Occurrences] Using auth token: ${token.substring(0, 20)}...`);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const apiUrl = `${INTERNAL_ROUTES.OCCURRENCES}?webinar_id=${webinarId}`;
    console.log(`[Occurrences] Calling API: GET ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });

    console.log(`[Occurrences] Response status: ${response.status}`);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('[Occurrences] API call failed:', data);
      return {
        success: false,
        error: data?.error || data?.message || "Failed to fetch occurrences",
      };
    }

    const responseData = data.data || data;
    console.log(`[Occurrences] Response data:`, responseData);
    console.log(`[Occurrences] Total occurrences fetched: ${responseData.occurrences?.length || 0}`);
    console.log(`==========================================\n`);

    return {
      success: true,
      data: responseData,
    };
  } catch (error: unknown) {
    console.error("[Occurrences] Fetch failed with error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to fetch occurrences",
    };
  }
};

export const refreshZoomToken = async (): Promise<ApiResult<RefreshTokenResponse>> => {
  try {
    const response = await fetch(INTERNAL_ROUTES.REFRESH_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || data?.message || "Failed to refresh token",
      };
    }

    return {
      success: true,
      data: data.data || data,
    };
  } catch (error: unknown) {
    console.error("Refresh token failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to refresh token",
    };
  }
};

