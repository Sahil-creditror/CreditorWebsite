type ApiResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

const INTERNAL_ROUTES = {
  REGISTER_WEBINAR: "/api/webx/register-webinar",
} as const;

export interface ZoomWebinarRegistrationPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  webinarId: string;
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
    const response = await fetch(INTERNAL_ROUTES.REGISTER_WEBINAR, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  } catch (error: any) {
    console.error("Zoom webinar registration failed:", error);
    return {
      success: false,
      error: error?.message || "Unable to complete webinar registration",
    };
  }
};

