# 🧪 How to Test if Tradelines are from API or Dummy Data

## Quick Test Methods

### Method 1: Check Browser Console

1. **Open the buy-tradelines page:**
   ```
   http://localhost:3000/services_page/tradeline-exchange/buy-tradelines
   ```

2. **Open Browser DevTools (F12) → Console tab**

3. **Look for these logs:**
   - ✅ **"Loading tradelines..."** - Shows API is being called
   - ✅ **No errors** - API is working
   - ❌ **"Error fetching tradelines"** - API failed, might show dummy data
   - ❌ **"Failed to fetch tradelines"** - Check API credentials

4. **Check Network Tab:**
   - Go to **Network tab** in DevTools
   - Refresh the page
   - Look for request to `/api/tradelines`
   - Click on it and check:
     - **Status:** Should be `200` (success) ✅
     - **Response:** Should show `"success": true` and array of tradelines
     - If you see `"success": false` or error → API is not working

### Method 2: Test API Directly

1. **Open this URL in browser:**
   ```
   http://localhost:3000/api/tradelines
   ```

2. **Check the response:**

   **✅ If API is working (from TradelineSupply):**
   ```json
   {
     "success": true,
     "tradelines": [
       {
         "id": "tl-...",
         "tradelineId": "1234567890",
         "bankName": "Chase Sapphire",
         "creditLimit": 15000,
         "price": 389.00,
         ...
       }
     ],
     "count": 10
   }
   ```

   **❌ If API is not working (error):**
   ```json
   {
     "success": false,
     "error": "TradelineSupply credentials not configured..."
   }
   ```

   **❌ If using dummy data:**
   - The page will show empty or error message
   - Check terminal for error logs

### Method 3: Check Server Logs (Terminal)

1. **Look at the terminal where `npm run dev` is running**

2. **Look for these logs:**

   **✅ API is working:**
   ```
   [api/tradelines] No errors
   ```

   **❌ API error:**
   ```
   [tradelineService] Error fetching tradelines: ...
   [api/tradelines] Error: ...
   TradelineSupply API error: 401 Unauthorized
   ```

### Method 4: Visual Indicators

**If tradelines are from API:**
- ✅ Bank names are real (Chase, Bank of America, etc.)
- ✅ Prices are current
- ✅ Stock/availability is accurate
- ✅ Data updates every 5-10 minutes (cache)

**If using dummy data:**
- ❌ Error message shown on page
- ❌ Empty tradeline list
- ❌ "Failed to load tradelines" message

### Method 5: Check Environment Variables

1. **Verify `.env.local` exists:**
   ```
   package/.env.local
   ```

2. **Check if credentials are set:**
   ```env
   TRADELINE_CONSUMER_KEY=your_actual_key_here
   TRADELINE_CONSUMER_SECRET=your_actual_secret_here
   ```

3. **If keys are missing or wrong:**
   - API will return error
   - Page will show error message
   - Check terminal for "credentials not configured" error

## 🔍 Detailed Testing Steps

### Step 1: Verify API Endpoint is Called

1. Open DevTools → Network tab
2. Filter by "tradelines"
3. Refresh page
4. You should see: `GET /api/tradelines`

### Step 2: Check Response Data

In Network tab, click on `/api/tradelines` request:

**Check Response Headers:**
- Status: `200 OK` ✅
- Content-Type: `application/json`

**Check Response Body:**
- Should have `"success": true`
- Should have `"tradelines"` array
- Each tradeline should have:
  - `id`
  - `bankName`
  - `creditLimit`
  - `price`
  - `tradelineId` (this is from API, not dummy)

### Step 3: Verify OAuth Authentication

If API returns `401 Unauthorized`:
- ✅ Check consumer key and secret in `.env.local`
- ✅ Restart dev server after updating `.env.local`
- ✅ Verify credentials with TradelineSupply

### Step 4: Compare with Known Data

If you know what tradelines should be in the API:
- Check if the same tradelines appear
- Check if prices match
- Check if stock availability is correct

## 🐛 Common Issues

### Issue: "Empty tradeline list"

**Possible causes:**
1. API returned empty array (no tradelines available)
2. All tradelines filtered out (stock = 0)
3. API error (check console)

**Solution:**
- Check API response directly: `http://localhost:3000/api/tradelines`
- Check browser console for errors
- Check terminal for API errors

### Issue: "Failed to fetch tradelines"

**Possible causes:**
1. Missing API credentials
2. Wrong API endpoint
3. Network error
4. OAuth signature issue

**Solution:**
- Check `.env.local` file exists and has correct credentials
- Restart dev server
- Check terminal for detailed error message

### Issue: "Rate limit exceeded"

**Solution:**
- Wait 1 minute
- API has rate limiting (30 requests/minute)

## ✅ Confirmation Checklist

- [ ] `/api/tradelines` returns `200 OK`
- [ ] Response has `"success": true`
- [ ] Response has `"tradelines"` array with data
- [ ] No errors in browser console
- [ ] No errors in terminal
- [ ] Tradelines display on page
- [ ] Bank names and prices look real (not dummy data)

## 🎯 Quick Test Command

Run this in browser console (F12):
```javascript
fetch('/api/tradelines')
  .then(r => r.json())
  .then(data => {
    console.log('API Status:', data.success ? '✅ Working' : '❌ Failed');
    console.log('Tradelines count:', data.count || 0);
    console.log('Sample tradeline:', data.tradelines?.[0]);
  });
```

If you see `success: true` and tradelines data → **API is working!** ✅

---

**Note:** The implementation always tries to fetch from API first. If API fails, it shows an error (not dummy data). Dummy data is only used during development if API is not configured.
