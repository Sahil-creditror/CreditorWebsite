import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { RECENT_REGISTRATION_LIMIT } from "@/lib/registrationUtils";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 5000,
    requestTimeout: 10000,
  }),
});

const BUCKET = process.env.AWS_S3_BUCKET as string | undefined;
const RECORDING_REGISTRATIONS_PREFIX = "recording-registrations/";
const S3_FETCH_BATCH_SIZE = 20;
const S3_FETCH_TIMEOUT_MS = 25000;

export interface RecordingRegistration {
  registrant_id: string;
  webinar_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
  join_url?: string;
  topic?: string;
  start_time?: string | null;
  registered_at: string;
  joined?: boolean;
  status?: string;
  type?: "recording";
}

async function listRecentRecordingRegistrationKeys(limit = RECENT_REGISTRATION_LIMIT): Promise<string[]> {
  if (!BUCKET) return [];

  const entries: { key: string; lastModified: number }[] = [];
  let continuationToken: string | undefined;

  do {
    const listResponse = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: RECORDING_REGISTRATIONS_PREFIX,
        ContinuationToken: continuationToken,
      })
    );

    for (const obj of listResponse.Contents ?? []) {
      if (!obj.Key) continue;
      entries.push({
        key: obj.Key,
        lastModified: obj.LastModified?.getTime() ?? 0,
      });
    }

    continuationToken = listResponse.IsTruncated ? listResponse.NextContinuationToken : undefined;
  } while (continuationToken);

  return entries
    .sort((a, b) => b.lastModified - a.lastModified)
    .slice(0, limit)
    .map((entry) => entry.key);
}

async function readRecordingRegistration(key: string): Promise<RecordingRegistration | null> {
  if (!BUCKET) return null;

  try {
    const objectResponse = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
    const bodyString = await objectResponse.Body?.transformToString();
    if (!bodyString) return null;

    return JSON.parse(bodyString) as RecordingRegistration;
  } catch (err) {
    console.error(`Error reading recording registration file ${key}:`, err);
    return null;
  }
}

async function fetchRecordingRegistrationsInternal(): Promise<RecordingRegistration[]> {
  const keys = await listRecentRecordingRegistrationKeys();
  const registrations: RecordingRegistration[] = [];

  for (let i = 0; i < keys.length; i += S3_FETCH_BATCH_SIZE) {
    const batch = keys.slice(i, i + S3_FETCH_BATCH_SIZE);
    const batchResults = await Promise.all(batch.map((key) => readRecordingRegistration(key)));
    registrations.push(...batchResults.filter((record): record is RecordingRegistration => record !== null));
  }

  return registrations;
}

export async function fetchRecordingRegistrations(): Promise<RecordingRegistration[]> {
  if (!BUCKET) {
    return [];
  }

  return Promise.race([
    fetchRecordingRegistrationsInternal(),
    new Promise<RecordingRegistration[]>((resolve) => {
      setTimeout(() => {
        console.warn("[recording-registrations] S3 fetch timed out, returning partial/empty data");
        resolve([]);
      }, S3_FETCH_TIMEOUT_MS);
    }),
  ]);
}

export async function saveRecordingRegistration(registration: RecordingRegistration): Promise<void> {
  if (!BUCKET) {
    console.log("[recording-registrations] registration received (no S3 configured)", registration);
    return;
  }

  const key = `${RECORDING_REGISTRATIONS_PREFIX}${registration.registrant_id}.json`;
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(JSON.stringify(registration, null, 2)),
      ContentType: "application/json",
      ServerSideEncryption: "AES256",
    })
  );
}
