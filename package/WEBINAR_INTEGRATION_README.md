# Webinar Registration & Email Integration

This documentation explains how to use the webinar registration system with automated email notifications.

## 📋 Overview

The system provides:
1. **Frontend Registration Flow**: Users register through a form and are redirected to a success page
2. **Session Management**: Countdown timer that activates the Zoom link when the session starts
3. **Email Notifications**: Automated emails for registered users, missed sessions, and feedback
4. **Backend Integration**: API endpoints to connect with your backend service

## 🚀 Setup Instructions

### Step 1: Configure API Endpoints

Edit `package/src/config/api.ts` and update the following:

```typescript
export const API_CONFIG = {
  // Replace with your actual backend API URL
  BASE_URL: 'https://your-backend-api.com/api',
  TIMEOUT: 30000,
};

// Update with your Zoom webinar ID
export const DEFAULT_WEBINAR_ID = 'YOUR_WEBINAR_ID';
```

Or set environment variables:
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
NEXT_PUBLIC_WEBINAR_ID=YOUR_WEBINAR_ID
```

### Step 2: Backend API Requirements

Your backend needs to implement these endpoints:

#### 1. Register User for Webinar
**POST** `/webinars/{webinarId}/registrants`

Request Body:
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890"
}
```

Response:
```json
{
  "id": "webinar_id",
  "join_url": "https://zoom.us/w/...",
  "registrant_id": "unique_id",
  "topic": "Webinar Topic",
  "start_time": "2024-01-01T11:15:00Z"
}
```

This endpoint should:
- Register the user in Zoom
- Send confirmation email with session link
- Return the unique join URL

#### 2. Get Registered Users
**GET** `/webinars/{webinarId}/registrants`

Response:
```json
{
  "registrants": [
    {
      "id": "reg_id",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "create_time": "2024-01-01T10:00:00Z",
      "join_url": "https://zoom.us/w/..."
    }
  ]
}
```

#### 3. Get Session Participants (After Session)
**GET** `/past_webinars/{webinarId}/participants`

Response:
```json
{
  "participants": [
    {
      "id": "participant_id",
      "name": "John Doe",
      "user_email": "user@example.com",
      "join_time": "2024-01-01T11:15:00Z",
      "leave_time": "2024-01-01T12:30:00Z",
      "duration": 75
    }
  ]
}
```

#### 4. Send "Missed Session" Email
**POST** `/emails/missed-session`

Request Body:
```json
{
  "webinar_id": "webinar_id",
  "registrant_emails": ["user1@example.com", "user2@example.com"]
}
```

Response:
```json
{
  "sent": 2
}
```

#### 5. Send Feedback Email
**POST** `/emails/feedback`

Request Body:
```json
{
  "webinar_id": "webinar_id",
  "participant_emails": ["user1@example.com", "user2@example.com"]
}
```

Response:
```json
{
  "sent": 2
}
```

### Step 3: Configure WonderEngine Form (Optional)

If you're using the WonderEngine form widget, you need to configure it to post messages when submitted:

Add this script to your form or configure it to send postMessage on successful submission:

```javascript
// After successful form submission
window.parent.postMessage({
  type: 'wonderengine_form_submit',
  success: true,
  data: {
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '+1234567890'
  }
}, '*');
```

## 📧 Email Automation

### Automated Email Triggers

The system can automatically send emails at the right times:

#### 1. Registration Confirmation
- **When**: Immediately after registration
- **Handled by**: Backend API (when user registers)
- **Contains**: Welcome message, session link, calendar invite

#### 2. Missed Session Email
- **When**: After the session ends (recommended: 30 minutes after)
- **Who**: Users who registered but didn't join
- **Trigger**: POST `/api/process-webinar-emails`

#### 3. Feedback Email
- **When**: After the session ends
- **Who**: Users who attended the session
- **Trigger**: POST `/api/process-webinar-emails`

### Setting Up Cron Jobs

You can automate email sending using cron jobs. Here are several options:

#### Option 1: Vercel Cron (if hosted on Vercel)

Add to `vercel.json`:
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

#### Option 2: External Cron Service (EasyCron, Cron-Job.org)

Schedule a POST request to:
```
https://your-domain.com/api/process-webinar-emails
```

Body:
```json
{
  "webinarId": "YOUR_WEBINAR_ID"
}
```

Schedule: After your webinar ends (e.g., if webinar is Saturday 11:15 AM - 12:45 PM, schedule for 1:15 PM)

#### Option 3: AWS EventBridge / CloudWatch

Create a scheduled rule that invokes a Lambda function to call your API endpoint.

#### Option 4: Manual Trigger

You can manually trigger email processing by calling:
```bash
curl -X POST https://your-domain.com/api/process-webinar-emails \
  -H "Content-Type: application/json" \
  -d '{"webinarId":"YOUR_WEBINAR_ID"}'
```

## 🎯 Usage Flow

### User Registration Flow

1. **User clicks "Join Now"** on the event page
2. **Registration form opens** (WonderEngine widget)
3. **User fills and submits** the form
4. **Frontend calls backend** to register user via `/webinars/{id}/registrants`
5. **Backend registers user** in Zoom and sends confirmation email
6. **User redirected** to success page (`/event-registration`)
7. **Success page shows**:
   - Confirmation message
   - Intro video
   - Session details
   - Countdown timer
   - Session link (activates when countdown hits zero)

### Post-Webinar Email Flow

1. **Webinar ends**
2. **Cron job triggers** (30 minutes after end time)
3. **System fetches**:
   - All registered users
   - All participants who joined
4. **System compares** and identifies:
   - Users who missed the session
   - Users who attended
5. **Automated emails sent**:
   - "You Missed the Session" to no-shows
   - "Feedback Request" to attendees

## 🔧 API Utilities

### Frontend Functions

Available in `package/src/lib/api.ts`:

```typescript
// Register a user
import { registerForWebinar } from '@/lib/api';

const result = await registerForWebinar('WEBINAR_ID', {
  email: 'user@example.com',
  first_name: 'John',
  last_name: 'Doe',
  phone: '+1234567890'
});

// Get registrants
import { getWebinarRegistrants } from '@/lib/api';
const registrants = await getWebinarRegistrants('WEBINAR_ID');

// Get participants
import { getSessionParticipants } from '@/lib/api';
const participants = await getSessionParticipants('WEBINAR_ID');
```

### Email Notification Functions

Available in `package/src/lib/emailNotifications.ts`:

```typescript
// Process all post-webinar emails
import { processPostWebinarEmails } from '@/lib/emailNotifications';

const result = await processPostWebinarEmails('WEBINAR_ID');
console.log(`Missed emails: ${result.missedEmailsSent}`);
console.log(`Feedback emails: ${result.feedbackEmailsSent}`);

// Get webinar statistics
import { getWebinarStats } from '@/lib/emailNotifications';

const stats = await getWebinarStats('WEBINAR_ID');
console.log(`Attendance rate: ${stats.stats.attendanceRate}%`);
```

## 📊 Monitoring & Stats

Get webinar statistics:

```bash
GET /api/webinar-stats?webinarId=YOUR_WEBINAR_ID
```

Response:
```json
{
  "success": true,
  "stats": {
    "totalRegistrants": 150,
    "totalParticipants": 120,
    "attendanceRate": 80,
    "noShowCount": 30
  }
}
```

## 🔒 Security Considerations

### Protecting Cron Endpoints

Add authentication to your cron endpoints:

1. Add a secret to your environment:
```bash
CRON_SECRET=your-secret-key-here
```

2. Update `package/src/app/api/process-webinar-emails/route.ts`:
```typescript
export async function POST(request: NextRequest) {
  // Add authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // ... rest of code
}
```

3. Include the header in your cron job:
```bash
Authorization: Bearer your-secret-key-here
```

## 🧪 Testing

### Test Registration Flow

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the event page and click "Join Now"
3. Fill out the registration form
4. Check the browser console for API calls
5. Verify redirect to success page with countdown

### Test Email Processing

```bash
# Call the API endpoint manually
curl -X POST http://localhost:3000/api/process-webinar-emails \
  -H "Content-Type: application/json" \
  -d '{"webinarId":"YOUR_WEBINAR_ID"}'
```

### Mock Backend for Testing

If your backend isn't ready, you can create a mock API using tools like:
- [JSON Server](https://github.com/typicode/json-server)
- [Mockoon](https://mockoon.com/)
- [Postman Mock Server](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/)

## 📝 Checklist

- [ ] Configure `API_CONFIG.BASE_URL` in `package/src/config/api.ts`
- [ ] Set `DEFAULT_WEBINAR_ID` or `NEXT_PUBLIC_WEBINAR_ID`
- [ ] Implement backend API endpoints
- [ ] Test registration flow
- [ ] Configure WonderEngine form to post messages
- [ ] Set up cron job for post-webinar emails
- [ ] Test email automation
- [ ] Add authentication to cron endpoints (production)
- [ ] Monitor and verify emails are being sent

## 🆘 Troubleshooting

### Registration doesn't redirect
- Check browser console for errors
- Verify WonderEngine form is sending postMessage
- Check that API endpoints are returning correct data

### Emails not sending
- Verify cron job is running
- Check API endpoint logs
- Ensure backend email service is configured
- Test API endpoint manually

### Countdown timer issues
- Verify session date format is correct (ISO 8601)
- Check timezone handling in backend

## 📞 Support

For questions or issues:
- Email: support@creditoracademy.com
- Phone: 425-400-9246

---

**Last Updated**: November 2025

