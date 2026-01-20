# 🔍 Debugging Tradeline Data Issues

## Common Issues & Solutions

### Issue: "Unknown Bank" or Missing Data

**Symptoms:**
- Tradelines show "Unknown Bank"
- Price shows $0
- Missing credit limit or other data

**Possible Causes:**

1. **API Response Structure Mismatch**
   - The API might be returning fields in a different format than expected
   - Check the actual API response structure

2. **Missing Fields in API Response**
   - `bank_name` might be missing or null
   - `price` might be 0 or missing
   - `credit_limit` might be in a different format

## 🔧 Debugging Steps

### Step 1: Check API Response

1. **Open browser console (F12)**

2. **Go to Network tab**

3. **Refresh the buy-tradelines page**

4. **Look for `/api/tradelines` request**

5. **Click on it and check the Response tab**

6. **Look for:**
   ```json
   {
     "success": true,
     "tradelines": [
       {
         "bankName": "...",
         "price": ...,
         "creditLimit": ...,
         ...
       }
     ]
   }
   ```

### Step 2: Check Server Logs

1. **Look at terminal where `npm run dev` is running**

2. **Look for logs like:**
   ```
   [tradelineService] API Response: ...
   [tradelineService] Sample raw tradeline: ...
   [api/tradelines] Sample tradeline: ...
   ```

3. **Check what fields are actually coming from TradelineSupply API**

### Step 3: Verify API Credentials

1. **Check `.env.local` file:**
   ```env
   TRADELINE_CONSUMER_KEY=your_key
   TRADELINE_CONSUMER_SECRET=your_secret
   ```

2. **Restart dev server after adding/updating credentials**

3. **Verify credentials are correct with TradelineSupply**

### Step 4: Test API Directly

1. **Open in browser:**
   ```
   http://localhost:3000/api/tradelines
   ```

2. **Check the response:**
   - If you see `{"success": false, "error": "..."}` → API is not working
   - If you see `{"success": true, "tradelines": []}` → API works but no tradelines
   - If you see tradelines but with missing data → Check field mapping

### Step 5: Check Console Logs

The code now includes debugging logs. Check browser console for:

```
[buy-tradelines] Loaded X tradelines
[buy-tradelines] Sample tradeline: {id: "...", bankName: "...", price: ...}
```

## 🛠️ Quick Fixes

### Fix 1: Update Field Mapping

If API returns different field names, update `tradelineService.ts`:

```typescript
// In fetchTradelinesFromAPI function, around line 280:
bankName: tl.bank_name || tl.bankName || tl.bank || "Unknown Bank",
price: tl.price || tl.base_price || tl.cost || 0,
creditLimit: parseCreditLimit(tl.credit_limit || tl.creditLimit || tl.limit),
```

### Fix 2: Check API Response Structure

Add this temporary logging in `tradelineService.ts`:

```typescript
// After line 251 (after const data = await response.json())
console.log("RAW API RESPONSE:", JSON.stringify(data, null, 2));
```

Then check terminal for the actual structure.

### Fix 3: Verify OAuth Signature

If you get 401 errors:
- Check consumer key and secret
- Verify OAuth signature generation
- Check TradelineSupply API documentation

## 📊 Expected Data Structure

### From TradelineSupply API:
```json
[
  {
    "bank_name": "Chase Sapphire",
    "card_id": "1234567890",
    "credit_limit": "$15,000",
    "credit_limit_original": 15000,
    "date_opened": "2018-01-15",
    "date_opened_original": 1515974400,
    "price": 389.00,
    "stock": 3,
    "reporting_period": "12th of month"
  }
]
```

### Processed (what your app uses):
```json
{
  "id": "tl-1234567890",
  "tradelineId": "1234567890",
  "bankName": "Chase Sapphire",
  "creditLimit": 15000,
  "price": 389.00,
  "ageYears": 6,
  "slotsAvailable": 3
}
```

## 🚨 Still Having Issues?

1. **Check all console logs** (browser and terminal)
2. **Verify API credentials** are correct
3. **Test API endpoint directly** in browser
4. **Check TradelineSupply API documentation** for field names
5. **Contact TradelineSupply support** if API structure differs

---

**The code now includes extensive logging. Check console and terminal for detailed information about what's happening!**
