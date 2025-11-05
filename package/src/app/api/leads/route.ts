import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Reuse the same AWS setup pattern as other routes
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    } : undefined,
});

const BUCKET = process.env.AWS_S3_BUCKET as string | undefined;

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 400 });
        }

        const body = await req.json().catch(() => ({}));
        const { email, firstName, lastName, source } = body || {};

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Missing required field: email" }, { status: 400 });
        }

        const payload = {
            email,
            firstName: typeof firstName === "string" ? firstName : "",
            lastName: typeof lastName === "string" ? lastName : "",
            source: typeof source === "string" ? source : "squeeze",
            userAgent: req.headers.get("user-agent") || "",
            timestamp: new Date().toISOString(),
            ip: req.headers.get("x-forwarded-for") || "",
        };

        // If S3 is configured, persist the lead JSON snapshot
        if (BUCKET) {
            const key = `leads/${payload.timestamp.replace(/[:.]/g, "-")}.json`;
            await s3.send(new PutObjectCommand({
                Bucket: BUCKET,
                Key: key,
                Body: Buffer.from(JSON.stringify(payload, null, 2)),
                ContentType: "application/json",
                ServerSideEncryption: "AES256",
            }));
        } else {
            // Fallback: log so we don't lose the lead during local/dev
            console.log("[leads] lead received (no S3 configured)", payload);
        }

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("Lead capture error", err);
        return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
    }
}


