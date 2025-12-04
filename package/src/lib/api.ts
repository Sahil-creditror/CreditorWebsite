/**
 * API Utility Functions for Backend Integration
 */

import { API_CONFIG, API_ENDPOINTS } from '@/config/api';
import { registerZoomWebinar, ZoomWebinarRegistrationPayload, ZoomWebinarRegistrationResponse } from '@/services/zoom';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Base fetch wrapper with timeout and error handling
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = API_CONFIG.TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

/**
 * Register User for Webinar
 * POST /webinars/{id}/registrants
 */
export interface RegisterWebinarPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

export type RegisterWebinarResponse = ZoomWebinarRegistrationResponse;

export async function registerForWebinar(
  webinarId: string,
  payload: RegisterWebinarPayload
): Promise<ApiResponse<RegisterWebinarResponse>> {
  try {
    const registrationResult = await registerZoomWebinar({
      ...payload,
      webinarId,
    } as ZoomWebinarRegistrationPayload);

    if (!registrationResult.success || !registrationResult.data) {
      return {
        success: false,
        error: registrationResult.error || 'Registration failed. Please try again.',
      };
    }

    return {
      success: true,
      data: registrationResult.data,
      message: registrationResult.message || 'Registration successful! Check your email for the session link.',
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'Failed to register. Please try again.',
    };
  }
}

/**
 * Get Registered Users
 * GET /webinars/{id}/registrants
 */
export interface Registrant {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  create_time: string;
  join_url: string;
}

export async function getWebinarRegistrants(
  webinarId: string
): Promise<ApiResponse<Registrant[]>> {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.GET_REGISTRANTS(webinarId)}`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Failed to fetch registrants: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.registrants || [],
    };
  } catch (error: any) {
    console.error('Get registrants error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch registrants.',
    };
  }
}

/**
 * Get Session Participants (After Session Ends)
 * GET /past_webinars/{id}/participants
 */
export interface Participant {
  id: string;
  name: string;
  user_email: string;
  join_time: string;
  leave_time: string;
  duration: number;
}

export async function getSessionParticipants(
  webinarId: string
): Promise<ApiResponse<Participant[]>> {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.GET_PARTICIPANTS(webinarId)}`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Failed to fetch participants: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.participants || [],
    };
  } catch (error: any) {
    console.error('Get participants error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch participants.',
    };
  }
}

/**
 * Send "You Missed the Session" Email
 * POST /emails/missed-session
 */
export interface MissedSessionPayload {
  webinar_id: string;
  registrant_emails: string[];
}

export async function sendMissedSessionEmail(
  payload: MissedSessionPayload
): Promise<ApiResponse<{ sent: number }>> {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SEND_MISSED_EMAIL}`;
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Failed to send emails: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
      message: 'Missed session emails sent successfully.',
    };
  } catch (error: any) {
    console.error('Send missed email error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send missed session emails.',
    };
  }
}

/**
 * Send Feedback Email to Participants
 * POST /emails/feedback
 */
export interface FeedbackEmailPayload {
  webinar_id: string;
  participant_emails: string[];
}

export async function sendFeedbackEmail(
  payload: FeedbackEmailPayload
): Promise<ApiResponse<{ sent: number }>> {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SEND_FEEDBACK_EMAIL}`;
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Failed to send feedback emails: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
      message: 'Feedback emails sent successfully.',
    };
  } catch (error: any) {
    console.error('Send feedback email error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send feedback emails.',
    };
  }
}

/**
 * Get Webinar Details
 * GET /webinars/{id}
 */
export interface WebinarDetails {
  id: string;
  topic: string;
  start_time: string;
  duration: number;
  timezone: string;
  join_url?: string;
}

export async function getWebinarDetails(
  webinarId: string
): Promise<ApiResponse<WebinarDetails>> {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.GET_WEBINAR(webinarId)}`;
    const response = await fetchWithTimeout(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Failed to fetch webinar: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('Get webinar details error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch webinar details.',
    };
  }
}

