# 🎓 Webinar Registration System

> Complete registration and email automation system for Creditor Academy's Saturday webinars

## 🎯 What This System Does

This system handles the complete webinar registration lifecycle:

1. ✅ **Registration**: Users register through a form
2. ✅ **Confirmation**: Automatic email with session link
3. ✅ **Success Page**: Countdown timer and session details
4. ✅ **Link Activation**: Zoom link activates when session starts
5. ✅ **Follow-up Emails**: Automatic emails after session ends
   - "You Missed the Session" for no-shows
   - "Feedback Request" for attendees

## 📚 Documentation

Choose the guide that fits your needs:

| Document | Purpose | Who Should Read |
|----------|---------|-----------------|
| **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** | Quick start guide | Developers implementing the system |
| **[WEBINAR_INTEGRATION_README.md](./WEBINAR_INTEGRATION_README.md)** | Technical documentation | Backend developers, DevOps |
| **[WONDERENGINE_INTEGRATION.md](./WONDERENGINE_INTEGRATION.md)** | Form integration guide | Frontend developers |
| **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** | Complete overview | Project managers, architects |

## 🚀 Quick Start (5 Minutes)

### 1. Set Environment Variables

Create `package/.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
NEXT_PUBLIC_WEBINAR_ID=YOUR_WEBINAR_ID
CRON_SECRET=your-random-secret-key
```

### 2. Start Development Server

```bash
cd package
npm install
npm run dev
```

### 3. Test Registration

1. Go to your event page
2. Click "Join Now"
3. Fill the form
4. Check redirect to success page

### 4. Backend Requirements

Your backend needs these 5 endpoints:

```
✅ POST   /webinars/{id}/registrants           # Register user
✅ GET    /webinars/{id}/registrants           # List registrants
✅ GET    /past_webinars/{id}/participants     # List participants
✅ POST   /emails/missed-session               # Send missed emails
✅ POST   /emails/feedback                     # Send feedback emails
```

### 5. Schedule Cron Job

After webinar ends, trigger:

```bash
POST /api/process-webinar-emails
Body: { "webinarId": "YOUR_WEBINAR_ID" }
```

## 📋 Implementation Checklist

- [ ] Configure environment variables
- [ ] Implement backend API endpoints
- [ ] Test registration flow
- [ ] Configure WonderEngine form (or use custom form)
- [ ] Set up cron job for email automation
- [ ] Test email processing
- [ ] Secure cron endpoint with authentication
- [ ] Deploy to production
- [ ] Monitor first webinar

## 🔧 Key Files Modified/Created

### Modified
- `src/app/components/home/event/index.tsx` - Added registration flow

### Created
```
src/
├── config/api.ts                              # API configuration
├── lib/
│   ├── api.ts                                 # API functions
│   └── emailNotifications.ts                  # Email automation
└── app/
    ├── (site)/event-registration/page.tsx     # Success page
    └── api/
        ├── process-webinar-emails/route.ts    # Email processor
        └── webinar-stats/route.ts             # Statistics
```

## 🎨 User Experience

### Registration Flow
```
Event Page → Click "Join Now" → Fill Form → Success Page
                                              ↓
                              Countdown → Link Activates → Join Zoom
```

### Email Flow
```
Register → Confirmation Email (immediate)
         ↓
    Attend Session?
    ├─ Yes → Feedback Email (after session)
    └─ No  → Missed Session Email (after session)
```

## 🔍 API Endpoints

### Frontend Endpoints

#### Process Webinar Emails
```bash
POST /api/process-webinar-emails
```
Processes post-webinar emails (missed session & feedback)

#### Get Webinar Stats
```bash
GET /api/webinar-stats?webinarId=YOUR_WEBINAR_ID
```
Returns attendance statistics

### Backend Endpoints (You Need to Implement)

See **[WEBINAR_INTEGRATION_README.md](./WEBINAR_INTEGRATION_README.md)** for detailed specifications.

## 🛡️ Security

- ✅ API request timeout (30s)
- ✅ Error handling and user feedback
- ✅ Optional cron endpoint authentication
- ✅ Input validation
- ✅ Origin verification for postMessage

## 📊 Monitoring

### Check Statistics
```bash
curl 'https://your-domain.com/api/webinar-stats?webinarId=YOUR_WEBINAR_ID'
```

### Check Email Processing
```bash
curl -X POST 'https://your-domain.com/api/process-webinar-emails' \
  -H "Content-Type: application/json" \
  -d '{"webinarId":"YOUR_WEBINAR_ID"}'
```

## 🐛 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Form doesn't submit | Check WonderEngine postMessage configuration |
| API calls fail | Verify `NEXT_PUBLIC_API_BASE_URL` is correct |
| No redirect after registration | Check browser console for errors |
| Countdown doesn't work | Verify session date format (ISO 8601) |
| Emails not sending | Check cron job is running and backend is accessible |

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed troubleshooting.

## 🎓 How It Works

### Registration
1. User clicks "Join Now" button
2. WonderEngine form opens in modal
3. User submits form
4. Form sends postMessage to parent window
5. Frontend calls your backend API
6. Backend registers user in Zoom
7. Backend sends confirmation email
8. Frontend redirects to success page

### Success Page
1. Displays confirmation message
2. Shows intro video
3. Displays session details
4. Countdown timer to session start
5. When countdown hits 0:0:0:0:
   - Link activates
   - User can join Zoom session

### Email Automation
1. Cron job triggers after webinar ends
2. Fetches all registrants from backend
3. Fetches all participants from backend
4. Compares lists to find no-shows
5. Sends "Missed Session" emails to no-shows
6. Sends "Feedback" emails to attendees

## 📦 Dependencies

All necessary packages should already be installed. If not:

```bash
npm install
```

No additional dependencies required for this system.

## 🔄 Updates & Maintenance

### Updating Webinar ID

Edit `src/config/api.ts`:
```typescript
export const DEFAULT_WEBINAR_ID = 'NEW_WEBINAR_ID';
```

Or set environment variable:
```bash
NEXT_PUBLIC_WEBINAR_ID=NEW_WEBINAR_ID
```

### Updating Backend URL

Edit `src/config/api.ts` or set:
```bash
NEXT_PUBLIC_API_BASE_URL=https://new-backend-url.com/api
```

### Updating Email Schedule

Edit cron job schedule or `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/process-webinar-emails",
      "schedule": "0 14 * * 6"  // Changed to 2 PM Saturday
    }
  ]
}
```

## 📞 Support

Need help?

- 📧 Email: support@creditoracademy.com
- 📱 Phone: 425-400-9246
- 📖 Documentation: See guides above

## 🎉 Success Metrics

After implementation, you should see:

- ✅ Automatic user registration
- ✅ 100% email delivery rate
- ✅ Improved user experience
- ✅ Automated follow-ups
- ✅ Better attendance tracking

## 📝 License & Credits

Created for Creditor Academy  
Implementation Date: November 2025  
Version: 1.0

---

## Next Steps

1. **New to this?** Start with **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**
2. **Setting up backend?** Read **[WEBINAR_INTEGRATION_README.md](./WEBINAR_INTEGRATION_README.md)**
3. **Configuring form?** Check **[WONDERENGINE_INTEGRATION.md](./WONDERENGINE_INTEGRATION.md)**
4. **Want overview?** See **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)**

**Ready to start?** → `cd package && npm run dev`

