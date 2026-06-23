import { NextRequest, NextResponse } from "next/server";
import { sendTeamNotificationEmail } from "@/lib/emailService";
import {
  fetchRecordingRegistrations,
  saveRecordingRegistration,
  type RecordingRegistration,
} from "@/lib/recordingRegistrationsStore";

// POST: Save a recording registration
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const { email, first_name, last_name, phone_number, webinar_id } = body || {};

    if (!email || !first_name || !last_name) {
      return NextResponse.json({ error: "Missing required fields: email, first_name, last_name" }, { status: 400 });
    }

    const registrant_id = `recording_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const registered_at = new Date().toISOString();

    const registration: RecordingRegistration = {
      registrant_id,
      webinar_id: webinar_id || "recording",
      email: email.toLowerCase(),
      first_name,
      last_name,
      phone_number: phone_number || null,
      join_url: undefined,
      topic: "Previous Session Recording",
      start_time: null,
      registered_at,
      joined: false,
      status: "recording",
      type: "recording",
    };

    await saveRecordingRegistration(registration);

    // Send team notification email for pre-recorded session (non-blocking - don't fail registration if email fails)
    console.log("[recording-registrations] Attempting to send team notification email for pre-recorded session...");
    console.log("[recording-registrations] Email data:", {
      attendeeName: `${first_name} ${last_name}`,
      attendeeEmail: email,
      attendeePhone: phone_number || "not provided",
      sessionType: "pre-recorded",
      sessionDate: registered_at,
    });
    
    try {
      await sendTeamNotificationEmail({
        attendeeName: `${first_name} ${last_name}`,
        attendeeEmail: email,
        attendeePhone: phone_number || undefined,
        meetingLink: undefined, // No meeting link for pre-recorded sessions
        sessionDate: registered_at,
        webinarId: webinar_id || "recording",
        sessionType: "pre-recorded",
      });
      console.log("[recording-registrations] ✅ Team notification email process completed");
    } catch (emailError: any) {
      // Log error but don't fail the registration
      console.error("═══════════════════════════════════════════════════");
      console.error("[recording-registrations] ❌ Failed to send team notification email");
      console.error("[recording-registrations] Registration still successful, but email failed");
      console.error("[recording-registrations] Error:", emailError?.message || String(emailError));
      console.error("[recording-registrations] Error stack:", emailError?.stack);
      console.error("═══════════════════════════════════════════════════");
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        registrant_id,
        join_url: "",
        start_time: registered_at,
        topic: "Previous Session Recording",
      }
    });
  } catch (err: any) {
    console.error("Recording registration error", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}

// GET: Fetch all recording registrations
export async function GET(req: NextRequest) {
  try {
    const registrations = await fetchRecordingRegistrations();

    return NextResponse.json({
      success: true,
      data: registrations,
    });
  } catch (err: any) {
    console.error("Error fetching recording registrations:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}

