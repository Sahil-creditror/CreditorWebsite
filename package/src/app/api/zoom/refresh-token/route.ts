import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

const ZOOM_ROUTES = {
  REFRESH_TOKEN: "/zoom/refresh-token",
};

const withBaseUrl = (path: string) => {
  const normalizedBase = API_CONFIG.BASE_URL?.replace(/\/$/, "") || "";
  return `${normalizedBase}${path}`;
};

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
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

export async function GET() {
  try {
    const refreshUrl = withBaseUrl(ZOOM_ROUTES.REFRESH_TOKEN);

    console.log("[ZOOM] Calling refresh token endpoint:", refreshUrl);

    const result = await fetchJson<RefreshTokenResponse>(refreshUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to refresh token",
        },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error: unknown) {
    console.error("[ZOOM] Refresh token error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to refresh token",
      },
      { status: 500 }
    );
  }
}

