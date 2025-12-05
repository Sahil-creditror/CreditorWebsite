import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

const WEBX_ROUTES = {
  PARTICIPANTS: "/zoom/participants",
};

// Static Zoom access token provided by backend team.
// Prefer env var if available, fallback to hard-coded token.
const STATIC_ZOOM_ACCESS_TOKEN =
  process.env.ZOOM_ACCESS_TOKEN ||
  "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjAwZGYyNmNlLTdkODMtNGYyNy1iM2I1LTUwMTAyYWUyYzBhNCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJwX2ZpS1NxSFNtU3N1Si0wYVhSZ3VnIiwidmVyIjoxMCwiYXVpZCI6ImY0NjlmZDAyNDVjMjBmODQ0Mzg2OTIzMmQwYjRmMjg1NzMzOTBkM2RlYmI2YmZhMWU3MzVhYTkyYWNlNGE2NzciLCJuYmYiOjE3NjQ4NDUyNTYsImNvZGUiOiJqaEZ5TUh5R1BMVE9uRGlzZUFJU211ZDVOckdCZUo5bWciLCJpc3MiOiJ6bTpjaWQ6enJQd1RZSzJUZ0tEMlBrcldGOUt2QSIsImdubyI6MCwiZXhwIjoxNzY0ODQ4ODU2LCJ0eXBlIjowLCJpYXQiOjE3NjQ4NDUyNTYsImFpZCI6IjlUaWJWRWlMVEwtMDVDQU1KcHo3cmcifQ.vN_xSNsbZutsWJXnpMUKT5LVUxBGWetnJqyv46FuKCHaRpsJnJUMdPtfCFuzqoVx8sg9HidMCRGYxQuaFNPCUw";

const withBaseUrl = (path: string) => {
  const normalizedBase = API_CONFIG.BASE_URL?.replace(/\/$/, "") || "";
  return `${normalizedBase}${path}`;
};

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T | null }> => {
  try {
    const response = await fetch(url, init);
    let data: T | null = null;
    
    try {
      const text = await response.text();
      if (text) {
        try {
          data = JSON.parse(text) as T;
        } catch (parseError) {
          console.error("[WEBX] Failed to parse JSON response:", parseError);
          console.error("[WEBX] Response text:", text.substring(0, 500)); // Log first 500 chars
        }
      }
    } catch (readError) {
      console.error("[WEBX] Failed to read response:", readError);
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (fetchError) {
    console.error("[WEBX] Fetch error:", fetchError);
    throw fetchError;
  }
};

export async function GET(request: Request) {
  try {
    // For GET requests, try to get webinarId from query params first, then body
    const url = new URL(request.url);
    let webinarId = url.searchParams.get("webinarId");

    // If not in query params, try to parse from body (for cases where body is sent)
    if (!webinarId) {
      try {
        const body = await request.json();
        webinarId = body?.webinarId;
      } catch {
        // Body might be empty or invalid JSON, which is fine for GET requests
        console.log("[WEBX] No valid JSON body found, using query params only");
      }
    }

    if (!webinarId) {
      return NextResponse.json({ success: false, error: "Missing webinarId" }, { status: 400 });
    }

    const webxParticipantsUrl = withBaseUrl(WEBX_ROUTES.PARTICIPANTS);

    console.log("[WEBX] Fetching participants for webinar:", webinarId);
    console.log("[WEBX] Backend URL:", webxParticipantsUrl);

    const accessToken = STATIC_ZOOM_ACCESS_TOKEN;

    // Use query parameters for GET request and pass both webinarId and access_token
    let finalUrl: string;
    try {
      const urlWithParams = new URL(webxParticipantsUrl);
      urlWithParams.searchParams.set("webinarId", webinarId);
      urlWithParams.searchParams.set("access_token", accessToken);
      finalUrl = urlWithParams.toString();
    } catch (urlError) {
      // If URL construction fails, manually append query parameter
      console.warn("[WEBX] URL construction error, using manual method:", urlError);
      const separator = webxParticipantsUrl.includes("?") ? "&" : "?";
      finalUrl = `${webxParticipantsUrl}${separator}webinarId=${encodeURIComponent(webinarId)}&access_token=${encodeURIComponent(accessToken)}`;
      console.log("[WEBX] Using manual URL construction:", finalUrl);
    }
    
    const participantsResult = await fetchJson<{ 
      success?: boolean;
      registerParticipants?: unknown[]; 
      participants?: unknown[]; 
      registrants?: unknown[]; 
      [key: string]: unknown 
    }>(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!participantsResult.ok) {
      return NextResponse.json(
        {
          success: false,
          error: (participantsResult.data as { message?: string })?.message || "Failed to fetch webinar participants.",
        },
        { status: participantsResult.status || 500 }
      );
    }

    // Handle response structure - extract registerParticipants if present
    const responseData = participantsResult.data;
    let participantsData: unknown = responseData;
    
    if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
      // If the response has registerParticipants, use that
      if ('registerParticipants' in responseData && Array.isArray(responseData.registerParticipants)) {
        participantsData = responseData.registerParticipants;
      } else if ('success' in responseData && 'registerParticipants' in responseData) {
        // If it's wrapped in a success object
        const successData = responseData as { registerParticipants?: unknown };
        if (Array.isArray(successData.registerParticipants)) {
          participantsData = successData.registerParticipants;
        }
      }
    }

    return NextResponse.json({ success: true, data: participantsData });
  } catch (error: unknown) {
    console.error("WebX participants API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unexpected server error while fetching participants.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

