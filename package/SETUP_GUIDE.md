# Quick Setup Guide

## 🚀 Quick Start

Follow these steps to set up the webinar registration system:

### Step 1: Environment Variables

Create a `.env.local` file in the `package` directory with the following variables:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api

# Zoom Webinar ID
NEXT_PUBLIC_WEBINAR_ID=YOUR_WEBINAR_ID

# Cron Job Authentication (Optional)
CRON_SECRET=your-secret-key-here

# Email Configuration (for team notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ankit@creditoracademy.com
SMTP_PASS=fvohslyupytgunhh
EMAIL_FROM=noreply@creditoracademy.com

# Team Email Addresses (comma-separated)
# These emails will receive notifications when someone registers for a webinar
TEAM_EMAILS=ankit@creditoracademy.com,rupali@creditoracademy.com,paulmichael@creditoracademy.com,aleena@creditoracademy.com,patricia@creditoracademy.com,james@creditoracademy.com,komal@creditoracademy.com
```

**Where to get these values:**

- `NEXT_PUBLIC_API_BASE_URL`: Your backend API endpoint that handles Zoom integration
  - Local development: `http://localhost:3001/api`
  - Production: `https://api.creditoracademy.com/api`
  
- `NEXT_PUBLIC_WEBINAR_ID`: From your Zoom account
  - Log into Zoom > Webinars > Select your webinar > Copy the Webinar ID
  
- `CRON_SECRET`: Generate a secure random string
  - Use: `openssl rand -hex 32` or any password generator

- `SMTP_USER` and `SMTP_PASS`: Email credentials for sending notifications
  - For Gmail: Use an [App Password](https://support.google.com/accounts/answer/185833) (not your regular password)
  - Enable 2-factor authentication first, then generate an app password
  - Format: `SMTP_USER=your-email@gmail.com` and `SMTP_PASS=your-16-char-app-password`

- `TEAM_EMAILS`: Comma-separated list of team member emails
  - These emails will receive notifications when someone registers for a webinar
  - Format: `TEAM_EMAILS=team1@example.com,team2@example.com,team3@example.com`
  - The notification includes the attendee's information and the meeting link

### Step 2: Install Dependencies

If you haven't already:

```bash
cd package
npm install
```

### Step 3: Update API Configuration

Edit `package/src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-backend-api.com/api',
  TIMEOUT: 30000,
};

export const DEFAULT_WEBINAR_ID = process.env.NEXT_PUBLIC_WEBINAR_ID || 'YOUR_WEBINAR_ID';
```

### Step 4: Configure Your Backend

Your backend must implement these 5 endpoints:

1. **POST** `/webinars/{id}/registrants` - Register user
2. **GET** `/webinars/{id}/registrants` - Get registrants list
3. **GET** `/past_webinars/{id}/participants` - Get participants list
4. **POST** `/emails/missed-session` - Send missed session emails
5. **POST** `/emails/feedback` - Send feedback emails

See `WEBINAR_INTEGRATION_README.md` for detailed API specifications.

### Step 5: Test the Registration Flow

1. Start the development server:
```bash
npm run dev
```

2. Navigate to your event page (where the Event component is displayed)

3. Click "Join Now" and test the registration form

4. After registration, you should be redirected to `/event-registration` with:
   - Success message
   - Intro video
   - Session details
   - Countdown timer
   - Session link

### Step 6: Set Up Email Automation

Choose one of these options:

#### Option A: Vercel Cron (Recommended for Vercel hosting)

Create `vercel.json` in the root:

```json
{
  "crons": [
    {
      "path": "/api/process-webinar-emails",
      "schedule": "0 13 * * 6"
    }
  ]
}
```

Schedule explanation:
- `0 13 * * 6` = Every Saturday at 1:00 PM (13:00)
- Adjust based on your webinar end time

#### Option B: External Cron Service

Use services like:
- [EasyCron](https://www.easycron.com/)
- [Cron-Job.org](https://cron-job.org/)
- [cron-job.org](https://console.cron-job.org/)

Setup:
1. Create an account
2. Add a new cron job:
   - **URL**: `https://your-domain.com/api/process-webinar-emails`
   - **Method**: POST
   - **Body**: `{"webinarId":"YOUR_WEBINAR_ID"}`
   - **Headers**: 
     - `Content-Type: application/json`
     - `Authorization: Bearer YOUR_CRON_SECRET` (if using authentication)
   - **Schedule**: After your webinar ends (e.g., 1:00 PM Saturday)

#### Option C: Manual Trigger

After each webinar, manually call:

```bash
curl -X POST https://your-domain.com/api/process-webinar-emails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -d '{"webinarId":"YOUR_WEBINAR_ID"}'
```

### Step 7: Configure WonderEngine Form

If using WonderEngine widget, add this script to send postMessage on form submission:

```javascript
// Add to your WonderEngine form settings or custom script
window.parent.postMessage({
  type: 'wonderengine_form_submit',
  success: true,
  data: {
    email: formData.email,
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone
  }
}, '*');
```

## 🧪 Testing

### Test Registration

1. Open your event page
2. Click "Join Now"
3. Fill out the form
4. Check browser console for:
   ```
   Registration successful!
   Redirecting to: /event-registration?name=...
   ```
5. Verify redirect to success page

### Test Email Processing

```bash
# Test the endpoint
curl -X POST http://localhost:3000/api/process-webinar-emails \
  -H "Content-Type: application/json" \
  -d '{"webinarId":"YOUR_WEBINAR_ID"}'

# Expected response:
{
  "success": true,
  "missedEmailsSent": 5,
  "feedbackEmailsSent": 10
}
```

### Test Webinar Stats

```bash
curl http://localhost:3000/api/webinar-stats?webinarId=YOUR_WEBINAR_ID

# Expected response:
{
  "success": true,
  "stats": {
    "totalRegistrants": 15,
    "totalParticipants": 10,
    "attendanceRate": 66.67,
    "noShowCount": 5
  }
}
```

## 📋 Verification Checklist

Before going live:

- [ ] ✅ Environment variables set in `.env.local`
- [ ] ✅ Backend API endpoints implemented and tested
- [ ] ✅ WonderEngine form configured to send postMessage
- [ ] ✅ Registration flow tested end-to-end
- [ ] ✅ Success page displays correctly with countdown
- [ ] ✅ Zoom link activates when countdown reaches zero
- [ ] ✅ Cron job scheduled for post-webinar emails
- [ ] ✅ Test email processing endpoint
- [ ] ✅ Cron endpoint secured with authentication (production)
- [ ] ✅ Confirmation emails being sent on registration
- [ ] ✅ Team notification emails configured and working
- [ ] ✅ SMTP credentials configured correctly
- [ ] ✅ Team email addresses set in `TEAM_EMAILS`
- [ ] ✅ Missed session emails working
- [ ] ✅ Feedback emails working

## 🔍 Troubleshooting

### Registration form doesn't submit

**Problem**: Form submits but nothing happens

**Solution**:
1. Open browser console (F12)
2. Look for postMessage from iframe
3. Verify WonderEngine form has postMessage script
4. Check for CORS errors

### API calls failing

**Problem**: Registration fails with network error

**Solution**:
1. Check `NEXT_PUBLIC_API_BASE_URL` is correct
2. Verify backend is running and accessible
3. Check browser console for error details
4. Test backend endpoint directly with curl

### Countdown not working

**Problem**: Countdown shows 00:00:00

**Solution**:
1. Verify `session_date` parameter in URL is valid ISO 8601 date
2. Check backend returns correct `start_time` format
3. Ensure timezone is handled correctly

### Emails not sending

**Problem**: No emails received after webinar

**Solution**:
1. Check cron job is running (check cron service logs)
2. Verify webinar ID is correct
3. Test endpoint manually
4. Check backend email service configuration
5. Verify email addresses in registrant list

### Team notification emails not sending

**Problem**: Team members not receiving registration notifications

**Solution**:
1. Verify `TEAM_EMAILS` environment variable is set with comma-separated email addresses
2. Check `SMTP_USER` and `SMTP_PASS` are configured correctly
3. For Gmail: Make sure you're using an App Password, not your regular password
4. Check server logs for email sending errors
5. Verify SMTP settings (host, port, secure) match your email provider
6. Test in development mode - emails will be logged to console if SMTP is not configured

### Zoom link not activating

**Problem**: Link stays disabled after countdown ends

**Solution**:
1. Check countdown has reached 0:0:0:0
2. Verify `isLinkActive` state is updating
3. Check `join_url` is present in URL parameters
4. Look for JavaScript errors in console

## 📚 Additional Resources

- **Full Documentation**: See `WEBINAR_INTEGRATION_README.md`
- **API Reference**: See `package/src/lib/api.ts`
- **Email Functions**: See `package/src/lib/emailNotifications.ts`

## 🆘 Need Help?

Contact:
- Email: support@creditoracademy.com
- Phone: 425-400-9246

---

**Setup Guide Version**: 1.0  
**Last Updated**: November 2025

