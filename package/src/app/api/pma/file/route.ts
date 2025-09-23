import { NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    } : undefined,
});

const BUCKET = process.env.AWS_S3_BUCKET as string;

export async function GET(req: NextRequest) {
    try {
        if (!BUCKET) return new Response("Missing AWS_S3_BUCKET env", { status: 500 });

        const { searchParams } = new URL(req.url);
        const key = searchParams.get("key");
        if (!key) return new Response("Missing key", { status: 400 });

        const obj = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
        const body = obj.Body as any;
        const contentType = obj.ContentType || "application/octet-stream";
        const headers = new Headers();
        headers.set("Content-Type", contentType);
        // Let browser download or preview in a new tab
        if (obj.ContentDisposition) headers.set("Content-Disposition", obj.ContentDisposition);
        return new Response(body as ReadableStream, { headers });
    } catch (err: any) {
        return new Response(`Not found: ${String(err?.message || err)}`, { status: 404 });
    }
}


