import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";
import { ZoomWebinarRegistrationPayload, ZoomWebinarRegistrationResponse } from "@/services/zoom";

const WEBX_ROUTES = {
  CONNECT: "/zoom/connect",
  REGISTER_WEBINAR: "/zoom/register-webinar",
};

// Static Zoom access token provided by backend team.
// Prefer env var if available, fallback to hard-coded token.
const STATIC_ZOOM_ACCESS_TOKEN =
  process.env.ZOOM_ACCESS_TOKEN ||
  "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImY4MjkyZWEyLTk1ZDgtNDIyYy1iNmY4LTczOGQ3YjY1YThjNSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJwX2ZpS1NxSFNtU3N1Si0wYVhSZ3VnIiwidmVyIjoxMCwiYXVpZCI6ImY0NjlmZDAyNDVjMjBmODQ0Mzg2OTIzMmQwYjRmMjg1NzMzOTBkM2RlYmI2YmZhMWU3MzVhYTkyYWNlNGE2NzciLCJuYmYiOjE3NjQ3NjE1NTAsImNvZGUiOiJpenVocmh3WkExWUU2c0lOX0gwUXNxV2s2c1NJbzlkeGciLCJpc3MiOiJ6bTpjaWQ6enJQd1RZSzJUZ0tEMlBrcldGOUt2QSIsImdubyI6MCwiZXhwIjoxNzY0NzY1MTUwLCJ0eXBlIjowLCJpYXQiOjE3NjQ3NjE1NTAsImFpZCI6IjlUaWJWRWlMVEwtMDVDQU1KcHo3cmcifQ.00jINHwN-VNH2HD0Kl-2FeM94drfW2rvvN7OEfhI5Et9w3gjgOJHstLd1XwKtmgmYEm96KlCXlPoYJQyoMDomA";

const withBaseUrl = (path: string) => {
  const normalizedBase = API_CONFIG.BASE_URL?.replace(/\/$/, "") || "";
  return `${normalizedBase}${path}`;
};

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T | null }> => {
  const response = await fetch(url, init);
  const data = await response
    .json()
    .then((value) => value as T)
    .catch(() => null);

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ZoomWebinarRegistrationPayload;

    if (!payload?.webinarId) {
      return NextResponse.json({ success: false, error: "Missing webinarId" }, { status: 400 });
    }

    const webxRegisterUrl = withBaseUrl(WEBX_ROUTES.REGISTER_WEBINAR);

    console.log("[WEBX] Incoming frontend registration payload:", {
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone_number: payload.phone_number,
      webinarId: payload.webinarId,
    });

    const accessToken = STATIC_ZOOM_ACCESS_TOKEN;

    const { email, first_name, last_name, phone_number, webinarId } = payload;

    const webxBody = {
      email,
      first_name,
      last_name,
      // Ensure phone_number is a number if provided, to match WebX spec
      phone_number: typeof phone_number === "string" ? Number(phone_number) || undefined : phone_number,
      webinarId,
    };

    console.log("[WEBX] Calling backend register endpoint:", {
      url: webxRegisterUrl,
      body: webxBody,
    });

    const registerResult = await fetchJson<ZoomWebinarRegistrationResponse | { message?: string }>(webxRegisterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(webxBody),
      cache: "no-store",
    });

    if (!registerResult.ok || !registerResult.data) {
      return NextResponse.json(
        {
          success: false,
          error: (registerResult.data as { message?: string })?.message || "Zoom webinar registration failed.",
        },
        { status: registerResult.status || 500 }
      );
    }

    const responseData = registerResult.data as ZoomWebinarRegistrationResponse;

    // Treat missing core Zoom fields as a failed registration so the UI doesn't show "success"
    if (!responseData?.registrant_id || !responseData?.join_url) {
      return NextResponse.json(
        {
          success: false,
          error:
            (registerResult.data as { message?: string })?.message ||
            "Webinar registration did not complete correctly on WebX/Zoom.",
          data: registerResult.data,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error: any) {
    console.error("WebX register-webinar API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected server error while registering." },
      { status: 500 }
    );
  }
}

