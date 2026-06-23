import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

export const dynamic = "force-dynamic";

const WEBX_ROUTES = {
  MERGED_REPORT: "/zoom/webinar/merged-report",
};

const BACKEND_TIMEOUT_MS = 10000;

const STATIC_ZOOM_ACCESS_TOKEN =
  process.env.ZOOM_ACCESS_TOKEN ||
  "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjNhYjFhNWI0LTdjZGItNDc3NS1hZDRlLTQ5YjVjYmEyMWYwNiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJwX2ZpS1NxSFNtU3N1Si0wYVhSZ3VnIiwidmVyIjoxMCwiYXVpZCI6ImY0NjlmZDAyNDVjMjBmODQ0Mzg2OTIzMmQwYjRmMjg1NzMzOTBkM2RlYmI2YmZhMWU3MzVhYTkyYWNlNGE2NzciLCJuYmYiOjE3NjQ5NTA3MzAsImNvZGUiOiIyT3dDR1lyN0c3RlhkMlctYi03UjZtQU0yMGtFR0xSZWciLCJpc3MiOiJ6bTpjaWQ6enJQd1RZSzJUZ0tEMlBrcldGOUt2QSIsImdubyI6MCwiZXhwIjoxNzY0OTU0MzMwLCJ0eXBlIjowLCJpYXQiOjE3NjQ5NTA3MzAsImFpZCI6IjlUaWJWRWlMVEwtMDVDQU1KcHo3cmcifQ.T4dyf3PtoZ08mB3BGgzmlaZHDUcICNnfk4X37Zgk185PSR_ZchJV_SRs8inGOrCdPod1k6ZIqzUDJqPnKILLcg";

const withBaseUrl = (path: string) => {
  const normalizedBase = API_CONFIG.BASE_URL?.replace(/\/$/, "") || "";
  return `${normalizedBase}${path}`;
};

type MergedReportRecord = {
  registrant_id: string;
  webinar_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
  join_url?: string;
  topic?: string;
  start_time?: string | null;
  registered_at?: string | null;
  joined?: boolean;
  status?: string;
  join_time?: string | null;
  leave_time?: string | null;
  duration?: number | null;
};

const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs: number): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const parseJsonResponse = async <T>(response: Response): Promise<T | null> => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    console.warn("[WEBX] Non-JSON merged report response:", text.substring(0, 200));
    return null;
  }
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const webinarId = url.searchParams.get("webinarId");
    const reportUrl = withBaseUrl(WEBX_ROUTES.MERGED_REPORT);

    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace("Bearer ", "") || STATIC_ZOOM_ACCESS_TOKEN;

    let zoomData: MergedReportRecord[] = [];

    try {
      const response = await fetchWithTimeout(
        reportUrl,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        },
        BACKEND_TIMEOUT_MS
      );

      if (response.ok) {
        const payload = await parseJsonResponse<{
          success?: boolean;
          data?: MergedReportRecord[];
          [key: string]: unknown;
        }>(response);

        zoomData = Array.isArray(payload?.data) ? payload.data : [];
      } else {
        console.warn("Failed to fetch Zoom merged report:", response.status);
      }
    } catch (error) {
      console.warn("Error fetching Zoom merged report:", error);
    }

    const filtered = webinarId
      ? zoomData.filter((record) => record.webinar_id === webinarId)
      : zoomData;

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: unknown) {
    console.error("Merged report API error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error while fetching merged report.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
