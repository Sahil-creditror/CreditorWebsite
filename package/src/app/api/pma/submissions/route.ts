import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    } : undefined,
});

const BUCKET = process.env.AWS_S3_BUCKET as string;
const PREFIX = "pma-submissions/";

type Submission = {
    folder: string; // e.g. pma-submissions/2025-09-23T12-00-00-000Z
    jsonKey: string; // e.g. pma-submissions/.../form.json
    createdAt?: string; // derived from folder name if possible
    payload?: unknown; // parsed JSON
    files?: string[]; // S3 keys for uploaded files
};

export async function GET(_req: NextRequest) {
    try {
        if (!BUCKET) {
            return NextResponse.json({ error: "Missing AWS_S3_BUCKET env" }, { status: 500 });
        }

        // List the top-level objects under PREFIX to find folders that contain form.json
        const listed = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: PREFIX }));
        const contents = listed.Contents || [];

        // Find all keys that end with /form.json
        const jsonObjects = contents.filter((o) => o.Key && o.Key.endsWith("/form.json"));

        const submissions: Submission[] = [];
        for (const obj of jsonObjects) {
            const key = obj.Key as string;
            const folder = key.substring(0, key.length - "/form.json".length);
            const parts = folder.split("/");
            const folderName = parts[parts.length - 1];
            let createdAt: string | undefined;
            // The upload uses ISO string with : and . replaced by -
            // We can keep it as-is for display
            if (folderName) createdAt = folderName.replace(/^pma-submissions\//, "");

            // Fetch and parse the JSON
            let payload: unknown = undefined;
            try {
                const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
                const body = await res.Body?.transformToString();
                if (body) payload = JSON.parse(body);
            } catch (e) {
                // ignore parse errors but include minimal entry
            }

            // List files under the folder's files/ prefix
            let files: string[] = [];
            try {
                const listFiles = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: `${folder}/files/` }));
                files = (listFiles.Contents || [])
                    .map((o) => o.Key)
                    .filter((k): k is string => !!k);
            } catch {}

            submissions.push({ folder, jsonKey: key, createdAt, payload, files });
        }

        // Sort newest first based on Key LastModified if available
        submissions.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || "")).reverse();

        return NextResponse.json({ ok: true, submissions });
    } catch (err: any) {
        console.error("PMA list submissions error", err);
        return NextResponse.json({ error: "List failed", detail: String(err?.message || err) }, { status: 500 });
    }
}


