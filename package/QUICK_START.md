# 🚀 Quick Start Guide - TradelineSupply Integration

## Step 1: Add Your API Keys

### Location: `package/.env.local`

Create this file in the **`package`** folder (same level as `package.json`):

```
CreditorWebsite/
└── package/
    ├── .env.local          ← CREATE THIS FILE HERE
    ├── package.json
    ├── next.config.ts
    └── src/
```

### File Content:

Copy and paste this into `package/.env.local`:

```env
TRADELINE_CONSUMER_KEY=your_consumer_key_from_tradelinesupply
TRADELINE_CONSUMER_SECRET=your_consumer_secret_from_tradelinesupply
TRADELINE_MARKUP_PERCENT=0
```

**Replace:**
- `your_consumer_key_from_tradelinesupply` → Your actual Consumer Key
- `your_consumer_secret_from_tradelinesupply` → Your actual Consumer Secret

## Step 2: Install Dependencies

```bash
cd package
npm install
```

## Step 3: Run the Development Server

```bash
npm run dev
```

## Step 4: Test It

1. **Open browser:** http://localhost:3000/services_page/tradeline-exchange/buy-tradelines

2. **Test API directly:** http://localhost:3000/api/tradelines

3. **Check for errors:**
   - Browser console (F12 → Console tab)
   - Terminal where `npm run dev` is running

## ✅ Success Indicators

- ✅ Page loads without errors
- ✅ Loading spinner appears briefly
- ✅ Tradelines list displays
- ✅ Compliance disclaimer shows at bottom
- ✅ No errors in browser console

## ❌ Common Issues

**"Credentials not configured" error:**
→ Make sure `.env.local` is in the `package/` folder (not `src/`)

**"Failed to fetch tradelines" error:**
→ Check your Consumer Key and Secret are correct
→ Restart the dev server after adding `.env.local`

**Page shows "Error Loading Tradelines":**
→ Check the terminal for detailed error messages
→ Verify your API credentials with TradelineSupply

---

**Need more help?** See `TRADELINE_SETUP.md` for detailed troubleshooting.
