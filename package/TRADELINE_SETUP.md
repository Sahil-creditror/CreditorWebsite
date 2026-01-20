# TradelineSupply Integration Setup Guide

## 📋 Overview

This guide explains how to set up and test the TradelineSupply API integration in your Next.js application.

## 🔑 Step 1: Add API Credentials

### Create `.env.local` file

In the **root of your `package` directory**, create a file named `.env.local`:

```
package/.env.local
```

### Add your TradelineSupply credentials:

```env
# Required: Your TradelineSupply Consumer Key
TRADELINE_CONSUMER_KEY=your_actual_consumer_key_here

# Required: Your TradelineSupply Consumer Secret
TRADELINE_CONSUMER_SECRET=your_actual_consumer_secret_here

# Optional: Markup percentage (default: 0)
# Example: 15 = 15% markup
TRADELINE_MARKUP_PERCENT=0

# Optional: API Base URL (only if different from default)
# Default: https://tradelinesupply.com/wp-json/wc/v3/pricing
# TRADELINE_API_BASE_URL=https://tradelinesupply.com/wp-json/wc/v3/pricing
```

**⚠️ IMPORTANT:**
- Never commit `.env.local` to git
- Replace `your_actual_consumer_key_here` and `your_actual_consumer_secret_here` with your real credentials from TradelineSupply
- The `.env.local` file is already in `.gitignore` for security

## 📁 File Structure

The integration consists of these files:

```
package/
├── .env.local                    # ← ADD YOUR KEYS HERE
├── src/
│   ├── lib/
│   │   └── tradelineService.ts   # Server-only service layer
│   └── app/
│       ├── api/
│       │   └── tradelines/
│       │       └── route.ts      # API route handler
│       └── services_page/
│           └── tradeline-exchange/
│               └── buy-tradelines/
│                   └── page.tsx  # Updated frontend page
```

## 🚀 Step 2: Install Dependencies

Make sure you have all dependencies installed:

```bash
cd package
npm install
```

## 🧪 Step 3: Test the Integration

### Option A: Test Locally (Development)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:3000/services_page/tradeline-exchange/buy-tradelines
   ```

3. **Check the browser console:**
   - Open DevTools (F12)
   - Look for any errors in the Console tab
   - Check the Network tab for API calls to `/api/tradelines`

### Option B: Test API Route Directly

Test the API endpoint directly:

```bash
# Using curl
curl http://localhost:3000/api/tradelines

# Or open in browser
http://localhost:3000/api/tradelines
```

**Expected Response:**
```json
{
  "success": true,
  "tradelines": [
    {
      "id": "tl-123",
      "tradelineId": "123",
      "bankName": "Chase Sapphire",
      "last4": "4821",
      "ageYears": 6,
      "creditLimit": 15000,
      "utilizationPercent": 5,
      "statementDate": "12th of month",
      "price": 389.00,
      "slotsTotal": 3,
      "slotsAvailable": 1
    }
  ],
  "count": 10
}
```

## 🔍 Step 4: Verify Everything Works

### ✅ Checklist:

- [ ] `.env.local` file exists in `package/` directory
- [ ] API credentials are added (no placeholder text)
- [ ] Development server starts without errors
- [ ] `/api/tradelines` endpoint returns data
- [ ] Buy Tradelines page loads without errors
- [ ] Tradelines are displayed on the page
- [ ] Loading state shows while fetching
- [ ] Compliance disclaimer appears below tradeline list

## 🐛 Troubleshooting

### Error: "TradelineSupply credentials not configured"

**Solution:** 
- Check that `.env.local` exists in the `package/` directory
- Verify the variable names are exactly: `TRADELINE_CONSUMER_KEY` and `TRADELINE_CONSUMER_SECRET`
- Restart the development server after adding/updating `.env.local`

### Error: "Failed to fetch tradelines"

**Possible causes:**
1. **Invalid credentials** - Double-check your consumer key and secret
2. **Wrong API endpoint** - The default endpoint is `https://tradelinesupply.com/wp-json/wc/v3/pricing`. If different, update `TRADELINE_API_BASE_URL` in `.env.local`
3. **OAuth signature issue** - The service uses OAuth 1.0 with HMAC-SHA1 signature (based on TradelineSupply PHP reference). Verify your credentials are correct
4. **Network/CORS issues** - Make sure the server can reach the TradelineSupply API endpoint

### Error: "Rate limit exceeded"

**Solution:**
- The API route has rate limiting (30 requests/minute per IP)
- Wait 1 minute and try again
- For production, consider using Redis for distributed rate limiting

### No tradelines showing

**Check:**
1. API response structure - The service expects tradelines in one of these formats:
   - Direct array: `[{...}, {...}]`
   - Nested: `{ data: [{...}] }`
   - Nested: `{ tradelines: [{...}] }`
   - Nested: `{ results: [{...}] }`

2. Field names - The service handles both `snake_case` and `camelCase`. If TradelineSupply uses different field names, update the mapping in `tradelineService.ts`

3. Filtering - Only approved and available tradelines are shown. Check if your test data meets these criteria:
   - `approved !== false`
   - `available !== false`
   - `slotsAvailable > 0`

## 🔧 Customization

### Adjust API Endpoint

If TradelineSupply uses a different endpoint path, update in `tradelineService.ts`:

```typescript
// Line ~95 in tradelineService.ts
const endpoint = `${baseUrl}/tradelines`; // Change to your endpoint
```

### Adjust Authentication Method

If TradelineSupply uses OAuth 1.0 with signature, update `createAuthHeader()`:

```typescript
// You may need to install: npm install oauth-1.0a crypto
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

function createAuthHeader(consumerKey: string, consumerSecret: string): string {
  const oauth = new OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
  });
  // ... implement OAuth 1.0 signature
}
```

### Adjust Cache Duration

Change cache TTL in `tradelineService.ts`:

```typescript
// Line ~23
const CACHE_TTL_MS = 10 * 60 * 1000; // Change to 10 minutes
```

## 📝 Production Deployment

### Environment Variables

Add the same environment variables to your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `TRADELINE_CONSUMER_KEY`, `TRADELINE_CONSUMER_SECRET`, `TRADELINE_MARKUP_PERCENT`

**Other Platforms:**
- Add the same variables in your platform's environment variable settings
- Never commit `.env.local` to git

### Security Checklist

- ✅ API keys are in environment variables (not in code)
- ✅ `.env.local` is in `.gitignore`
- ✅ API route is server-side only
- ✅ No API keys exposed in browser/network tab
- ✅ Rate limiting enabled
- ✅ Error messages don't expose sensitive info

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Check server logs (terminal where `npm run dev` is running)
3. Verify API credentials with TradelineSupply
4. Test the API endpoint directly: `/api/tradelines`
5. Review the troubleshooting section above

## 🎯 Next Steps

After successful setup:

1. Test the full flow: Browse → Select → Add to Cart → Checkout
2. Verify compliance disclaimer is visible
3. Test filtering and sorting
4. Monitor API rate limits
5. Adjust markup percentage as needed

---

**Ready to test?** Start with Step 1 and work through the checklist! 🚀
