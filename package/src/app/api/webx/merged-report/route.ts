import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

export const dynamic = 'force-dynamic';

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

    // Fetch Zoom registrations
    const reportUrl = withBaseUrl(WEBX_ROUTES.MERGED_REPORT);
    let zoomData: MergedReportRecord[] = [];

    try {
      const response = await fetch(reportUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const payload = (await response.json()) as {
          success?: boolean;
          data?: MergedReportRecord[];
          [key: string]: unknown;
        };
        zoomData = Array.isArray(payload?.data) ? payload.data : [];
      } else {
        console.warn("Failed to fetch Zoom merged report, continuing with recording registrations only");
      }
    } catch (error) {
      console.warn("Error fetching Zoom merged report:", error);
    }

    // Fetch recording registrations directly
    let recordingData: MergedReportRecord[] = [];
    try {
      // Import the recording registrations handler directly
      const { S3Client, ListObjectsV2Command, GetObjectCommand } = await import("@aws-sdk/client-s3");
      
      const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        } : undefined,
      });

      const BUCKET = process.env.AWS_S3_BUCKET as string | undefined;
      const RECORDING_REGISTRATIONS_PREFIX = "recording-registrations/";

      if (BUCKET) {
        const listCommand = new ListObjectsV2Command({
          Bucket: BUCKET,
          Prefix: RECORDING_REGISTRATIONS_PREFIX,
        });

        const listResponse = await s3.send(listCommand);
        const keys = listResponse.Contents?.map(obj => obj.Key || "").filter(Boolean) || [];

        for (const key of keys) {
          try {
            const getCommand = new GetObjectCommand({
              Bucket: BUCKET,
              Key: key,
            });
            const objectResponse = await s3.send(getCommand);
            const bodyString = await objectResponse.Body?.transformToString();
            if (bodyString) {
              const registration = JSON.parse(bodyString) as MergedReportRecord;
              recordingData.push(registration);
            }
          } catch (err) {
            console.error(`Error reading recording registration file ${key}:`, err);
          }
        }
      }
    } catch (error) {
      console.warn("Error fetching recording registrations:", error);
    }

    // Merge both datasets
    const mergedData = [...zoomData, ...recordingData];

    // Filter by webinarId if provided
    const filtered = webinarId 
      ? mergedData.filter((record) => record.webinar_id === webinarId) 
      : mergedData;

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


