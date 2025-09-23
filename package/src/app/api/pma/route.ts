import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	} : undefined,
});

const BUCKET = process.env.AWS_S3_BUCKET as string;

export async function POST(req: NextRequest) {
	try {
		if (!BUCKET) {
			return NextResponse.json({ error: "Missing AWS_S3_BUCKET env" }, { status: 500 });
		}
		const contentType = req.headers.get("content-type") || "";
		if (!contentType.includes("multipart/form-data")) {
			return NextResponse.json({ error: "Content-Type must be multipart/form-data" }, { status: 400 });
		}

		const form = await req.formData();

		// Expect a JSON field named "payload" containing the full form data snapshot
		const payloadRaw = form.get("payload");
		let payload: unknown = null;
		if (typeof payloadRaw === "string") {
			payload = JSON.parse(payloadRaw);
		}

		const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
		const folder = `pma-submissions/${timestamp}`;

		// Upload JSON snapshot
		if (payload) {
			const jsonKey = `${folder}/form.json`;
			await s3.send(new PutObjectCommand({
				Bucket: BUCKET,
				Key: jsonKey,
				Body: Buffer.from(JSON.stringify(payload, null, 2)),
				ContentType: "application/json",
				ServerSideEncryption: "AES256",
			}));
		}

		// Upload each file field if present
		const fileFields = [
			"articlesOfOrg",
			"ss4Letter",
			"voidedCheck",
			"governmentId",
			"businessStatement1",
			"businessStatement2",
			"businessStatement3",
			"personalStatement1",
			"personalStatement2",
			"personalStatement3",
			"customerServiceAgreement",
			"fulfillmentAgreement",
			"crmAgreement",
			"chargebackAgreement",
			"coa",
		];

		for (const field of fileFields) {
			const f = form.get(field);
			if (f && typeof f !== "string") {
				const file = f as File;
				const arrayBuffer = await file.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				const key = `${folder}/files/${field}-${file.name}`;
				await s3.send(new PutObjectCommand({
					Bucket: BUCKET,
					Key: key,
					Body: buffer,
					ContentType: file.type || "application/octet-stream",
					ServerSideEncryption: "AES256",
				}));
			}
		}

		return NextResponse.json({ ok: true, folder });
	} catch (err: any) {
		console.error("PMA submission error", err);
		return NextResponse.json({ error: "Upload failed", detail: String(err?.message || err) }, { status: 500 });
	}
}
