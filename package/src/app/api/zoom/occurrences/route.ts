import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

const ZOOM_ROUTES = {
  OCCURRENCES: "/zoom/occurrences",
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

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data?: T }> => {
  try {
    const response = await fetch(url, init);
    const data = response.ok ? await response.json() : undefined;
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error("Fetch error:", error);
    return { ok: false, status: 500 };
  }
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const webinarId = searchParams.get("webinar_id");

    if (!webinarId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing webinar_id parameter",
        },
        { status: 400 }
      );
    }

    // Get token from Authorization header, fallback to static token
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace("Bearer ", "") || STATIC_ZOOM_ACCESS_TOKEN;
    
    const occurrencesUrl = `${withBaseUrl(ZOOM_ROUTES.OCCURRENCES)}?webinar_id=${webinarId}`;

    console.log("[ZOOM] Fetching occurrences:", {
      url: occurrencesUrl,
      webinarId,
      usingClientToken: !!authHeader,
    });

    const result = await fetchJson<OccurrencesResponse>(occurrencesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch occurrences",
        },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error: unknown) {
    console.error("[ZOOM] Occurrences error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch occurrences",
      },
      { status: 500 }
    );
  }
}

