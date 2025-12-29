# Email Debugging Guide

## 🔍 Troubleshooting Email Not Sending

If team notification emails are not being sent after registration, follow these steps:

### Step 1: Verify Environment Variables

Check that your `.env.local` file in the `package` directory contains:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ankit@creditoracademy.com
SMTP_PASS=fvohslyupytgunhh
EMAIL_FROM=noreply@creditoracademy.com
TEAM_EMAILS=ankit@creditoracademy.com,rupali@creditoracademy.com,paulmichael@creditoracademy.com,aleena@creditoracademy.com,patricia@creditoracademy.com,james@creditoracademy.com,komal@creditoracademy.com
```

**Important:**
- ✅ File must be named `.env.local` (not `.env`)
- ✅ File must be in the `package` directory (not root)
- ✅ No quotes around values
- ✅ No spaces after commas in TEAM_EMAILS
- ✅ Restart Next.js server after changes

### Step 2: Check Server Logs

After a registration, check your server console for these log messages:

#### ✅ Success Indicators:
```
[EMAIL] Starting team notification email process
[EMAIL] SMTP_USER: ✅ SET
[EMAIL] SMTP_PASS: ✅ SET
[EMAIL] TEAM_EMAILS: ✅ SET
[EMAIL] Preparing to send team notification email...
[EMAIL] ✅ SMTP connection verified successfully
✅ Team notification email sent successfully!
```

#### ❌ Error Indicators:

**If you see:**
```
⚠️  No team emails configured. Skipping team notification.
```
→ **Fix:** Set `TEAM_EMAILS` in `.env.local`

**If you see:**
```
📧 EMAIL TEST MODE (SMTP not configured)
```
→ **Fix:** Set `SMTP_USER` and `SMTP_PASS` in `.env.local`

**If you see:**
```
⚠️  AUTHENTICATION FAILED
```
→ **Fix:** 
- Verify Gmail App Password is correct
- Make sure 2FA is enabled on Gmail account
- Generate new App Password at: https://myaccount.google.com/apppasswords

**If you see:**
```
⚠️  CONNECTION TIMEOUT
```
→ **Fix:**
- Check internet connection
- Verify firewall isn't blocking port 587
- Try using port 465 with `SMTP_SECURE=true`

### Step 3: Test Email Configuration

Create a test file `package/test-email.js`:

```javascript
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function test() {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful!");
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send test email to yourself
      subject: "Test Email from Creditor Academy",
      text: "This is a test email to verify SMTP configuration.",
    });
    
    console.log("✅ Test email sent! Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Code:", error.code);
  }
}

test();
```

Run: `node test-email.js`

### Step 4: Common Issues

#### Issue 1: Environment Variables Not Loading
**Symptom:** Logs show "NOT SET" for environment variables

**Solution:**
1. Ensure `.env.local` is in `package/` directory
2. Restart Next.js server completely
3. In Next.js, environment variables are loaded at startup

#### Issue 2: Gmail App Password Not Working
**Symptom:** Authentication failed (EAUTH error)

**Solution:**
1. Go to https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication first
3. Generate new App Password for "Mail"
4. Copy the 16-character password (no spaces)
5. Update `SMTP_PASS` in `.env.local`
6. Restart server

#### Issue 3: Emails Going to Spam
**Symptom:** Emails sent but not received

**Solution:**
- Check spam/junk folder
- Add `noreply@creditoracademy.com` to contacts
- Verify SPF/DKIM records for your domain (if using custom domain)

#### Issue 4: Connection Timeout
**Symptom:** ECONNECTION or ETIMEDOUT error

**Solution:**
- Check firewall settings
- Try port 465 with `SMTP_SECURE=true`
- Verify `smtp.gmail.com` is accessible
- Check if VPN is blocking connection

### Step 5: Verify Registration Flow

The email is sent in this order:

1. ✅ User submits registration form
2. ✅ Frontend calls `/api/webx/register-webinar`
3. ✅ API registers user with Zoom/WebX backend
4. ✅ **Email service is called** ← Check logs here
5. ✅ Registration response returned to frontend

**Check logs for:**
```
[WEBX] Attempting to send team notification email...
[EMAIL] Starting team notification email process
```

If you don't see these logs, the email function is not being called.

### Step 6: Manual Test

Test the email function directly by creating a test API route:

Create `package/src/app/api/test-email/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { sendTeamNotificationEmail } from "@/lib/emailService";

export async function GET() {
  try {
    await sendTeamNotificationEmail({
      attendeeName: "Test User",
      attendeeEmail: "test@example.com",
      attendeePhone: "1234567890",
      meetingLink: "https://zoom.us/test",
      sessionDate: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, message: "Test email sent" });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

Visit: `http://localhost:3000/api/test-email` (or your domain)

### Step 7: Production Checklist

For production deployment:

- [ ] `.env.local` is NOT committed to git (should be in `.gitignore`)
- [ ] Environment variables are set in hosting platform (Vercel, etc.)
- [ ] SMTP credentials are correct for production
- [ ] Team emails list is updated
- [ ] Test registration works end-to-end
- [ ] Check production logs for email sending status

## 📞 Still Not Working?

If emails still aren't sending after following all steps:

1. **Check server logs** - Look for `[EMAIL]` and `[WEBX]` prefixed messages
2. **Verify .env.local** - Double-check all values are correct
3. **Test SMTP connection** - Use the test script above
4. **Check Gmail account** - Verify App Password is valid
5. **Review error messages** - Look for specific error codes in logs

## 🔗 Useful Links

- Gmail App Passwords: https://myaccount.google.com/apppasswords
- Nodemailer Documentation: https://nodemailer.com/about/
- Next.js Environment Variables: https://nextjs.org/docs/basic-features/environment-variables

