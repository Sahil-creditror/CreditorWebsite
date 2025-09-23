# Creditor-nextjs-tailwind

image unoptimizaed in next config

## Deploying to Hostinger

You can deploy this Next.js app (with S3 uploads) on Hostinger either via the hPanel Node.js App or on a VPS. The application code lives in the `package/` directory and that is the app root.

### Required environment variables

Set these in your hosting environment (do NOT commit secrets to git):

- `AWS_REGION` (e.g., `eu-north-1`)
- `AWS_S3_BUCKET` (e.g., `pmaformdata`)
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `NODE_ENV=production`

The API route `/api/pma` uploads a JSON snapshot and any attached files to S3 under `pma-submissions/<timestamp>/`. Server-side encryption (SSE-S3) is enabled.

IAM permissions (least privilege):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::<YOUR_BUCKET>/pma-submissions/*"
    }
  ]
}
```

### hPanel Node.js App (no VPS)

1. Create app
   - In hPanel → Websites → Manage → Node.js → Create Application
   - Application root: point to the `package` folder
   - Node.js version: 18 or newer
   - Start command: `npm start`

2. Environment variables
   - hPanel → Advanced → Environment Variables → add the variables listed above

3. Install and build
   - Open Terminal (or SSH) in the app root (`package`):
     - `npm ci`
     - `npm run build`

4. Start / restart
   - In the Node.js app panel, click Start/Restart (Hostinger sets `PORT`; `next start` will use it)

5. Domain
   - Map your domain/subdomain to the Node.js app in hPanel

Test the form at `/pmaform`. Files should appear in `s3://<YOUR_BUCKET>/pma-submissions/<timestamp>/files/` and a JSON snapshot in `form.json`.

### VPS (pm2 + nginx)

1. Server setup
   - Install Node 18+ and pm2: `npm i -g pm2`
   - Optional: install nginx for reverse proxy

2. Deploy code
   - Clone or upload the project to the server
   - `cd package && npm ci && npm run build`

3. Environment variables
   - Export env vars via your process manager or `/etc/environment` (example):
     ```bash
     export AWS_REGION=eu-north-1
     export AWS_S3_BUCKET=pmaformdata
     export AWS_ACCESS_KEY_ID=***
     export AWS_SECRET_ACCESS_KEY=***
     export NODE_ENV=production
     ```

4. Start with pm2
   - `pm2 start npm --name creditor -- start`
   - `pm2 save && pm2 startup`

5. nginx reverse proxy (example)
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

Reload nginx and visit your domain.

### Notes

- Large uploads: if using nginx, adjust `client_max_body_size` as needed (e.g., `25m`).
- Security: keep AWS credentials only in host environment; rotate keys periodically.
- Encryption: SSE-S3 is enabled. Switch to SSE-KMS by adding `ServerSideEncryption: 'aws:kms'` and `SSEKMSKeyId` in the S3 upload calls if desired.
