import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";
import { fetchRecordingRegistrations } from "@/lib/recordingRegistrationsStore";
import { limitRecentRegistrations } from "@/lib/registrationUtils";

export const dynamic = "force-dynamic";

const WEBX_ROUTES = {
  MERGED_REPORT: "/zoom/webinar/merged-report",
};

const BACKEND_TIMEOUT_MS = 5000;
const ROUTE_DEADLINE_MS = 8000;

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
  date?: string;
};

const jsonResponse = (
  body: { success: boolean; count: number; data: MergedReportRecord[]; warning?: string; error?: string },
  status = 200
) =>
  NextResponse.json(body, {
    status,
    headers: {
      "X-Registration-Api-Version": "2",
      "Cache-Control": "no-store",
    },
  });

const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs: number): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const fetchZoomRegistrations = async (request: Request, webinarId: string | null): Promise<MergedReportRecord[]> => {
  const reportUrl = withBaseUrl(WEBX_ROUTES.MERGED_REPORT);
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "") || STATIC_ZOOM_ACCESS_TOKEN;

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

  if (!response.ok) {
    console.warn("Failed to fetch Zoom merged report:", response.status);
    return [];
  }

  const text = await response.text();
  if (!text) return [];

  let payload: { data?: MergedReportRecord[] } | null = null;
  try {
    payload = JSON.parse(text) as { data?: MergedReportRecord[] };
  } catch {
    console.warn("[WEBX] Non-JSON merged report response:", text.substring(0, 200));
    return [];
  }

  const zoomData = Array.isArray(payload?.data) ? payload.data : [];
  return webinarId ? zoomData.filter((record) => record.webinar_id === webinarId) : zoomData;
};

const buildMergedReport = async (request: Request): Promise<NextResponse> => {
  const url = new URL(request.url);
  const webinarId = url.searchParams.get("webinarId");

  const [zoomData, recordingData] = await Promise.all([
    fetchZoomRegistrations(request, webinarId).catch((error) => {
      console.warn("Error fetching Zoom merged report:", error);
      return [] as MergedReportRecord[];
    }),
    fetchRecordingRegistrations().catch((error) => {
      console.warn("Error fetching recording registrations:", error);
      return [];
    }),
  ]);

  const recent = limitRecentRegistrations([...zoomData, ...recordingData]);

  return jsonResponse({
    success: true,
    count: recent.length,
    data: recent,
  });
};

export async function GET(request: Request) {
  try {
    const result = await Promise.race([
      buildMergedReport(request),
      new Promise<NextResponse>((resolve) => {
        setTimeout(() => {
          resolve(
            jsonResponse({
              success: true,
              count: 0,
              data: [],
              warning: "Registration lookup timed out. Please try again.",
            })
          );
        }, ROUTE_DEADLINE_MS);
      }),
    ]);

    return result;
  } catch (error: unknown) {
    console.error("Merged report API error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error while fetching merged report.";
    return jsonResponse({ success: false, count: 0, data: [], error: message }, 500);
  }
}
