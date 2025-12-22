import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

const WEBX_ROUTES = {
  MERGED_REPORT: "/zoom/webinar/merged-report",
};

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

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const webinarId = url.searchParams.get("webinarId");

    const reportUrl = withBaseUrl(WEBX_ROUTES.MERGED_REPORT);
    const response = await fetch(reportUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: (errorPayload as { message?: string })?.message || "Failed to fetch merged report.",
        },
        { status: response.status }
      );
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: MergedReportRecord[];
      [key: string]: unknown;
    };

    const data = Array.isArray(payload?.data) ? payload.data : [];
    const filtered = webinarId ? data.filter((record) => record.webinar_id === webinarId) : data;

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


