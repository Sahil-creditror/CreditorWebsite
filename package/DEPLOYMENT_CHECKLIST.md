# ✅ Quick Deployment Checklist

Use this checklist when deploying to production.

## 🔐 Environment Variables (Set in Vercel/Netlify/etc.)

### Authentication (Required)
- [ ] `NEXTAUTH_SECRET` - Generate with `openssl rand -hex 32`
- [ ] `NEXTAUTH_URL` - Your production domain (e.g., `https://creditoracademy.com`)
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- [ ] `GITHUB_CLIENT_ID` - (Optional) From GitHub OAuth App
- [ ] `GITHUB_CLIENT_SECRET` - (Optional) From GitHub OAuth App

### Database (Required)
- [ ] `MONGODB_URI` - MongoDB Atlas connection string

### API Configuration (Required)
- [ ] `NEXT_PUBLIC_API_BASE_URL` - Backend API URL (e.g., `https://creditor.onrender.com/api`)

### Email Configuration (Required)
- [ ] `SMTP_HOST` - `smtp.gmail.com`
- [ ] `SMTP_PORT` - `587`
- [ ] `SMTP_SECURE` - `false`
- [ ] `SMTP_USER` - Your Gmail address
- [ ] `SMTP_PASS` - Gmail App Password (not regular password!)
- [ ] `EMAIL_FROM` - `noreply@creditoracademy.com`
- [ ] `TEAM_EMAILS` - Comma-separated list of team emails

### Webinar IDs (Required)
- [ ] `NEXT_PUBLIC_WEBINAR_ID` - Default webinar ID
- [ ] `NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT` - Midnight webinar ID
- [ ] `NEXT_PUBLIC_WEBINAR_ID_MORNING` - Morning webinar ID
- [ ] `NEXT_PUBLIC_WEBINAR_ID_AFTERNOON` - Afternoon webinar ID
- [ ] `NEXT_PUBLIC_WEBINAR_ID_EVENING` - Evening webinar ID

### Optional
- [ ] `TRADELINE_CONSUMER_KEY` - If using tradelines
- [ ] `TRADELINE_CONSUMER_SECRET` - If using tradelines
- [ ] `AWS_ACCESS_KEY_ID` - If using S3 for recordings
- [ ] `AWS_SECRET_ACCESS_KEY` - If using S3
- [ ] `AWS_REGION` - If using S3
- [ ] `AWS_S3_BUCKET` - If using S3
- [ ] `CRON_SECRET` - For cron job authentication
- [ ] `NEXT_PUBLIC_SITE_URL` - Your production domain

---

## 🔑 OAuth Provider Setup

### Google OAuth
- [ ] Created OAuth 2.0 Client ID in Google Cloud Console
- [ ] Added authorized JavaScript origins:
  - `https://creditoracademy.com`
  - `https://www.creditoracademy.com`
- [ ] Added authorized redirect URIs:
  - `https://creditoracademy.com/api/auth/callback/google`
  - `https://www.creditoracademy.com/api/auth/callback/google`
- [ ] Copied Client ID and Secret to environment variables

### GitHub OAuth (Optional)
- [ ] Created OAuth App in GitHub
- [ ] Set callback URL: `https://creditoracademy.com/api/auth/callback/github`
- [ ] Copied Client ID and Secret to environment variables

---

## 💾 MongoDB Setup

- [ ] Created MongoDB Atlas account
- [ ] Created cluster
- [ ] Created database user with read/write permissions
- [ ] Whitelisted IP addresses (or `0.0.0.0/0` for all)
- [ ] Got connection string
- [ ] Set `MONGODB_URI` with correct password and database name

---

## 🚀 Deployment Steps

### Vercel
- [ ] Connected GitHub repository
- [ ] Set root directory to `package`
- [ ] Added all environment variables
- [ ] Deployed
- [ ] Configured custom domain
- [ ] Verified HTTPS is enabled

### Other Platforms
- [ ] Set Node.js version to 18+
- [ ] Set build command: `npm run build`
- [ ] Set start command: `npm start`
- [ ] Added all environment variables
- [ ] Configured reverse proxy (if needed)

---

## ✅ Post-Deployment Testing

### Authentication
- [ ] Visit `/auth/signin`
- [ ] Test Google login
- [ ] Test GitHub login (if enabled)
- [ ] Verify redirect after login
- [ ] Verify session persists
- [ ] Test logout

### Database
- [ ] Check deployment logs for "MongoDB connected successfully"
- [ ] Test user registration saves to database
- [ ] Test order creation saves to database

### API Integration
- [ ] Test webinar registration
- [ ] Test tradeline fetching (if using)
- [ ] Verify API calls work from production

### Email
- [ ] Test registration sends confirmation email
- [ ] Verify team notification emails are received
- [ ] Check email logs for errors

### Webinar
- [ ] Test webinar registration flow
- [ ] Verify success page displays
- [ ] Test countdown timer
- [ ] Verify Zoom link activates at correct time

---

## 🔒 Security Checklist

- [ ] All secrets are in environment variables (not in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] HTTPS is enabled
- [ ] CORS is configured on backend
- [ ] `CRON_SECRET` is set (if using cron jobs)
- [ ] MongoDB IP whitelist is configured

---

## 📊 Monitoring Setup

- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] Uptime monitoring set up
- [ ] Log aggregation configured (if needed)

---

## 🆘 Quick Troubleshooting

**Auth not working?**
- Check `NEXTAUTH_URL` matches domain exactly
- Verify OAuth redirect URIs match

**Database errors?**
- Check `MONGODB_URI` is correct
- Verify IP whitelist includes deployment platform

**API errors?**
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct
- Check backend is accessible
- Verify CORS settings

**Emails not sending?**
- Use Gmail App Password (not regular password)
- Check `TEAM_EMAILS` format (comma-separated, no spaces)

---

**Need help?** See `DEPLOYMENT_GUIDE.md` for detailed instructions.
