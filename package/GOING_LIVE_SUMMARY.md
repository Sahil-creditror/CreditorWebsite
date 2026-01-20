# 🚀 Going Live - Quick Summary

## What You Need to Do

### 1. Set Environment Variables in Your Deployment Platform

Go to your deployment platform (Vercel, Netlify, etc.) and add these environment variables:

#### **Critical (Must Have)**
```bash
NEXTAUTH_SECRET=generate-with-openssl-rand-hex-32
NEXTAUTH_URL=https://your-domain.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
NEXT_PUBLIC_API_BASE_URL=https://creditor.onrender.com/api
```

#### **For Authentication (Google OAuth)**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### **For Email**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ankit@creditoracademy.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=noreply@creditoracademy.com
TEAM_EMAILS=ankit@creditoracademy.com,rupali@creditoracademy.com,...
```

#### **For Webinars**
```bash
NEXT_PUBLIC_WEBINAR_ID=85345478550
NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT=81368819394
NEXT_PUBLIC_WEBINAR_ID_MORNING=85345478550
NEXT_PUBLIC_WEBINAR_ID_AFTERNOON=85009970371
NEXT_PUBLIC_WEBINAR_ID_EVENING=84323907773
```

---

### 2. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 Client ID
3. Add these **Authorized redirect URIs**:
   - `https://your-domain.com/api/auth/callback/google`
   - `https://www.your-domain.com/api/auth/callback/google`
4. Copy Client ID and Secret to environment variables

---

### 3. Set Up MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster (free tier is fine)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (or your deployment platform IPs)
5. Get connection string and add to `MONGODB_URI`

---

### 4. Deploy

#### If using Vercel:
1. Connect GitHub repo
2. Set **Root Directory** to `package`
3. Add all environment variables
4. Deploy
5. Add custom domain

#### If using other platforms:
1. Set build command: `npm run build`
2. Set start command: `npm start`
3. Add all environment variables
4. Deploy

---

### 5. Test After Deployment

- [ ] Visit `/auth/signin` and test login
- [ ] Test user registration
- [ ] Test webinar registration
- [ ] Check emails are sending
- [ ] Verify database connection (check logs)

---

## 📚 Full Documentation

- **Detailed Guide**: See `DEPLOYMENT_GUIDE.md`
- **Quick Checklist**: See `DEPLOYMENT_CHECKLIST.md`

---

## ⚠️ Important Notes

1. **NEXTAUTH_URL** must match your domain exactly (including `https://`)
2. **Gmail App Password**: Use App Password, not regular password for `SMTP_PASS`
3. **MongoDB IP Whitelist**: Must include your deployment platform IPs
4. **OAuth Redirect URIs**: Must match exactly (case-sensitive)

---

## 🆘 Common Issues

**Auth not working?**
→ Check `NEXTAUTH_URL` matches domain exactly

**Database errors?**
→ Check MongoDB IP whitelist includes `0.0.0.0/0`

**Emails not sending?**
→ Use Gmail App Password, enable 2FA first

**API errors?**
→ Verify `NEXT_PUBLIC_API_BASE_URL` is correct and backend is running

---

**That's it!** Once environment variables are set and OAuth is configured, your site should work in production.
