import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";
import { ZoomWebinarRegistrationPayload, ZoomWebinarRegistrationResponse } from "@/services/zoom";

const WEBX_ROUTES = {
  CONNECT: "/zoom/connect",
  REGISTER_WEBINAR: "/zoom/registar-webinar",
};

// Static Zoom access token provided by backend team.
// Prefer env var if available, fallback to hard-coded token.
const STATIC_ZOOM_ACCESS_TOKEN =
  process.env.ZOOM_ACCESS_TOKEN ||
  "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjNhYjFhNWI0LTdjZGItNDc3NS1hZDRlLTQ5YjVjYmEyMWYwNiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJwX2ZpS1NxSFNtU3N1Si0wYVhSZ3VnIiwidmVyIjoxMCwiYXVpZCI6ImY0NjlmZDAyNDVjMjBmODQ0Mzg2OTIzMmQwYjRmMjg1NzMzOTBkM2RlYmI2YmZhMWU3MzVhYTkyYWNlNGE2NzciLCJuYmYiOjE3NjQ5NTA3MzAsImNvZGUiOiIyT3dDR1lyN0c3RlhkMlctYi03UjZtQU0yMGtFR0xSZWciLCJpc3MiOiJ6bTpjaWQ6enJQd1RZSzJUZ0tEMlBrcldGOUt2QSIsImdubyI6MCwiZXhwIjoxNzY0OTU0MzMwLCJ0eXBlIjowLCJpYXQiOjE3NjQ5NTA3MzAsImFpZCI6IjlUaWJWRWlMVEwtMDVDQU1KcHo3cmcifQ.T4dyf3PtoZ08mB3BGgzmlaZHDUcICNnfk4X37Zgk185PSR_ZchJV_SRs8inGOrCdPod1k6ZIqzUDJqPnKILLcg";

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

    // Accept both webinarId (camel) and webinar_id (snake) from the client
    const webinarId = payload.webinarId || (payload as any).webinar_id;

    if (!webinarId) {
      return NextResponse.json({ success: false, error: "Missing webinar_id" }, { status: 400 });
    }

    const webxRegisterUrl = withBaseUrl(WEBX_ROUTES.REGISTER_WEBINAR);

    console.log("[WEBX] Incoming frontend registration payload:", {
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone_number: payload.phone_number,
      webinarId,
      occurrence_id: payload.occurrence_id,
    });

    // Get token from Authorization header, fallback to static token
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace("Bearer ", "") || STATIC_ZOOM_ACCESS_TOKEN;
    
    console.log("[WEBX] Using", authHeader ? "client-provided" : "static", "access token");

    const { email, first_name, last_name, phone_number, occurrence_id } = payload;

    const webxBody = {
      email,
      first_name,
      last_name,
      // Ensure phone_number is a number if provided, to match WebX spec
      phone_number: typeof phone_number === "string" ? Number(phone_number) || undefined : phone_number,
      webinar_id: webinarId,
      occurrence_id,
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
  } catch (error: unknown) {
    console.error("WebX registar-webinar API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unexpected server error while registering.";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

