# 🚀 Production Deployment Guide

This guide covers everything you need to deploy your Creditor Academy website to production with authentication and API functionality.

## 📋 Table of Contents

1. [Environment Variables](#environment-variables)
2. [Authentication Setup](#authentication-setup)
3. [API Configuration](#api-configuration)
4. [Database Setup](#database-setup)
5. [Deployment Platforms](#deployment-platforms)
6. [Post-Deployment Checklist](#post-deployment-checklist)

---

## 🔐 Environment Variables

### Required Environment Variables

Create a `.env.local` file in your deployment platform (Vercel, Netlify, etc.) with these variables:

```bash
# ============================================
# NextAuth Authentication
# ============================================
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-hex-32
NEXTAUTH_URL=https://your-production-domain.com

# Google OAuth (Optional but recommended)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# ============================================
# MongoDB Database
# ============================================
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# ============================================
# Backend API Configuration
# ============================================
NEXT_PUBLIC_API_BASE_URL=https://api.lmsathena.com/api
# OR your custom backend:
# NEXT_PUBLIC_API_BASE_URL=https://api.creditoracademy.com/api

# ============================================
# Zoom Webinar Configuration
# ============================================
NEXT_PUBLIC_WEBINAR_ID=85345478550
NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT=81368819394
NEXT_PUBLIC_WEBINAR_ID_MORNING=85345478550
NEXT_PUBLIC_WEBINAR_ID_AFTERNOON=85009970371
NEXT_PUBLIC_WEBINAR_ID_EVENING=84323907773

# ============================================
# Email Configuration (SMTP)
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ankit@creditoracademy.com
SMTP_PASS=your-app-password-here
EMAIL_FROM=noreply@creditoracademy.com

# Team notification emails (comma-separated)
TEAM_EMAILS=ankit@creditoracademy.com,rupali@creditoracademy.com,paulmichael@creditoracademy.com,aleena@creditoracademy.com,patricia@creditoracademy.com,james@creditoracademy.com,komal@creditoracademy.com

# ============================================
# TradelineSupply API (Optional)
# ============================================
TRADELINE_CONSUMER_KEY=your-tradeline-consumer-key
TRADELINE_CONSUMER_SECRET=your-tradeline-consumer-secret
TRADELINE_MARKUP_PERCENT=0

# ============================================
# AWS S3 (Optional - for recordings)
# ============================================
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# ============================================
# Cron Job Security
# ============================================
CRON_SECRET=your-secure-random-string-here

# ============================================
# Site Configuration
# ============================================
NEXT_PUBLIC_SITE_URL=https://creditoracademy.com
SITE_NAME=Creditor Academy
AUTHOR_NAME=Creditor Academy Team

# ============================================
# Payment Links (Optional)
# ============================================
NEXT_PUBLIC_PAYMENT_LINK_BASE=https://your-payment-link-base.com
NEXT_PUBLIC_BROKER_FORM_URL=https://your-broker-form-url.com
```

---

## 🔑 Authentication Setup

### Step 1: Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
# On Mac/Linux:
openssl rand -hex 32

# On Windows (PowerShell):
-([System.Web.Security.Membership]::GeneratePassword(64, 0))

# Or use online generator:
# https://generate-secret.vercel.app/32
```

Set this as `NEXTAUTH_SECRET` in your environment variables.

### Step 2: Set NEXTAUTH_URL

Set `NEXTAUTH_URL` to your production domain:
- **Production**: `https://creditoracademy.com`
- **Staging**: `https://staging.creditoracademy.com`

**Important**: This must match your actual domain exactly (including `https://`).

### Step 3: Configure OAuth Providers

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure:
   - **Application type**: Web application
   - **Name**: Creditor Academy
   - **Authorized JavaScript origins**: 
     - `https://creditoracademy.com`
     - `https://www.creditoracademy.com`
   - **Authorized redirect URIs**:
     - `https://creditoracademy.com/api/auth/callback/google`
     - `https://www.creditoracademy.com/api/auth/callback/google`
6. Copy **Client ID** and **Client Secret** to environment variables

#### GitHub OAuth Setup (Optional)

1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Configure:
   - **Application name**: Creditor Academy
   - **Homepage URL**: `https://creditoracademy.com`
   - **Authorization callback URL**: `https://creditoracademy.com/api/auth/callback/github`
4. Copy **Client ID** and **Client Secret** to environment variables

### Step 4: Test Authentication

After deployment, test:
1. Visit: `https://your-domain.com/auth/signin`
2. Try logging in with Google/GitHub
3. Verify redirect works correctly
4. Check session persists after page refresh

---

## 🌐 API Configuration

### Backend API Setup

Your backend API should be running and accessible. Current configuration points to:
- **Production**: `https://api.lmsathena.com/api`

If you have a custom backend:

1. Update `NEXT_PUBLIC_API_BASE_URL` in environment variables
2. Update `package/src/config/api.ts` (optional, env var takes precedence)
3. Update `package/src/lib/tokenManager.ts` if needed

### API Endpoints Required

Your backend must implement these endpoints:

1. **POST** `/webinars/{webinarId}/registrants` - Register user for webinar
2. **GET** `/webinars/{webinarId}/registrants` - Get registrants list
3. **GET** `/past_webinars/{webinarId}/participants` - Get participants
4. **POST** `/emails/missed-session` - Send missed session emails
5. **POST** `/emails/feedback` - Send feedback emails

See `WEBINAR_INTEGRATION_README.md` for detailed API specifications.

---

## 💾 Database Setup

### MongoDB Atlas Setup (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Create Database User**
   - Go to **Database Access**
   - Click **Add New Database User**
   - Choose **Password** authentication
   - Username: `creditor-admin` (or your choice)
   - Password: Generate secure password
   - **Database User Privileges**: Read and write to any database

4. **Whitelist IP Addresses**
   - Go to **Network Access**
   - Click **Add IP Address**
   - For production: Click **Allow Access from Anywhere** (`0.0.0.0/0`)
   - Or add specific IPs for better security

5. **Get Connection String**
   - Go to **Clusters** → Click **Connect**
   - Choose **Connect your application**
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `creditor-website`)
   - Example: `mongodb+srv://creditor-admin:password@cluster0.xxxxx.mongodb.net/creditor-website?retryWrites=true&w=majority`

6. **Set MONGODB_URI**
   - Add the connection string to `MONGODB_URI` environment variable

### Test Database Connection

After deployment, check logs for:
- ✅ `MongoDB connected successfully`
- ❌ `MongoDB connection error:` → Check your `MONGODB_URI`

---

## 🚀 Deployment Platforms

### Vercel (Recommended for Next.js)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set **Root Directory** to `package`
   - Add all environment variables (see above)
   - Deploy

3. **Configure Custom Domain**:
   - Go to **Settings** → **Domains**
   - Add your domain: `creditoracademy.com`
   - Follow DNS configuration instructions

4. **Configure Cron Jobs**:
   - `vercel.json` is already configured
   - Cron job runs: Every Saturday at 1:00 PM
   - Path: `/api/process-webinar-emails`

### Netlify

1. **Deploy via Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Build settings:
     - **Base directory**: `package`
     - **Build command**: `npm run build`
     - **Publish directory**: `package/.next`
   - Add all environment variables

2. **Note**: Netlify doesn't support server-side cron jobs. Use external cron service.

### Other Platforms

For other platforms (AWS, DigitalOcean, etc.):
- Ensure Node.js 18+ is installed
- Run `npm run build` then `npm start`
- Set all environment variables
- Configure reverse proxy if needed

---

## ✅ Post-Deployment Checklist

### Authentication
- [ ] `NEXTAUTH_SECRET` is set and secure
- [ ] `NEXTAUTH_URL` matches production domain exactly
- [ ] Google OAuth configured with correct redirect URIs
- [ ] GitHub OAuth configured (if using)
- [ ] Test login flow works
- [ ] Test logout works
- [ ] Session persists after refresh

### Database
- [ ] `MONGODB_URI` is set correctly
- [ ] MongoDB Atlas IP whitelist includes deployment platform IPs
- [ ] Database connection successful (check logs)
- [ ] Test user registration saves to database
- [ ] Test order creation saves to database

### API Integration
- [ ] `NEXT_PUBLIC_API_BASE_URL` points to production backend
- [ ] Backend API is accessible from production
- [ ] Test webinar registration works
- [ ] Test tradeline fetching works (if using)
- [ ] CORS is configured on backend for production domain

### Email Configuration
- [ ] `SMTP_USER` and `SMTP_PASS` are set
- [ ] Gmail App Password is used (not regular password)
- [ ] `TEAM_EMAILS` contains all team member emails
- [ ] Test registration sends confirmation email
- [ ] Test team notification emails are received

### Webinar Configuration
- [ ] All webinar IDs are set correctly
- [ ] Test webinar registration flow
- [ ] Test success page displays correctly
- [ ] Test countdown timer works
- [ ] Test Zoom link activates at correct time

### Security
- [ ] All sensitive environment variables are set (not in code)
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] `CRON_SECRET` is set for cron job authentication
- [ ] HTTPS is enabled (required for OAuth)
- [ ] CORS is properly configured

### Performance
- [ ] Images are optimized
- [ ] Build completes without errors
- [ ] No console errors in production
- [ ] Page load times are acceptable

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Monitor API response times
- [ ] Set up uptime monitoring

---

## 🔧 Troubleshooting

### Authentication Not Working

**Problem**: Users can't log in

**Solutions**:
1. Check `NEXTAUTH_URL` matches domain exactly (including `https://`)
2. Verify OAuth redirect URIs match exactly
3. Check `NEXTAUTH_SECRET` is set
4. Clear browser cookies and try again
5. Check browser console for errors

### Database Connection Fails

**Problem**: `MongoDB connection error`

**Solutions**:
1. Verify `MONGODB_URI` is correct
2. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0` or your platform IPs
3. Verify database user password is correct
4. Check MongoDB Atlas cluster is running
5. Test connection string locally first

### API Calls Failing

**Problem**: API requests return errors

**Solutions**:
1. Verify `NEXT_PUBLIC_API_BASE_URL` is correct
2. Check backend API is running and accessible
3. Verify CORS allows your production domain
4. Check API authentication/authorization
5. Test API endpoints directly with curl/Postman

### Emails Not Sending

**Problem**: No emails received

**Solutions**:
1. Verify `SMTP_USER` and `SMTP_PASS` are correct
2. For Gmail: Use App Password, not regular password
3. Check `TEAM_EMAILS` is set correctly (comma-separated)
4. Verify SMTP settings match your email provider
5. Check deployment logs for email errors

---

## 📞 Support

If you encounter issues:

1. Check deployment platform logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test locally first with production environment variables
5. Contact: support@creditoracademy.com

---

## 🔄 Updating After Deployment

### Adding New Environment Variables

1. Add to deployment platform's environment variables
2. Redeploy application
3. Test the new feature

### Updating Dependencies

1. Update `package.json`
2. Run `npm install` locally
3. Commit changes
4. Push to trigger redeployment

### Database Migrations

If you need to update database schema:
1. Create migration script
2. Run on production database (carefully!)
3. Test thoroughly

---

**Last Updated**: December 2024  
**Version**: 1.0
