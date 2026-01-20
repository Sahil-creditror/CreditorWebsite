# 📊 Data Storage Guide - Where Everything is Stored

## 🗄️ Backend Database (MongoDB)

### **User Data Storage**

**Location:** MongoDB Database
**Connection:** Set via `MONGODB_URI` environment variable
**Collection:** `users` (MongoDB automatically creates this)

**What's Stored:**
- User ID (auto-generated MongoDB `_id`)
- Name
- Email (unique, indexed)
- Password (hashed with bcrypt)
- Created At (timestamp)

**Schema Location:** `src/app/api/auth/models/User.ts`

**Storage File:** `src/app/api/auth/users-store.ts`

### **How to Check User Data:**

#### Option 1: MongoDB Compass (Desktop App)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect using your `MONGODB_URI`
3. Navigate to database → `users` collection
4. See all users with their data

#### Option 2: MongoDB Shell (mongosh)
```bash
# Connect to MongoDB
mongosh "your_mongodb_uri"

# Use the database
use creditor-website

# View all users
db.users.find().pretty()

# Count users
db.users.countDocuments()

# Find specific user
db.users.findOne({ email: "user@example.com" })
```

#### Option 3: API Endpoint (Development Only)
Create a test endpoint to view users (remove in production):
```typescript
// GET /api/admin/users (don't create this in production!)
const users = await userStore.getAll();
```

## 💾 Frontend Storage (Browser)

### **Cart Data**

**Location:** Browser `localStorage`
**Key:** `tradeline_cart`
**Storage File:** `src/app/services_page/tradeline-exchange/lib/cart.ts`

**What's Stored:**
```json
[
  {
    "tradelineId": "tl-31288",
    "quantity": 1,
    "addedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**How to Check:**
1. Open browser DevTools (F12)
2. Go to **Application** tab → **Local Storage**
3. Click on your domain
4. Look for key: `tradeline_cart`
5. View/edit the JSON data

**To View in Console:**
```javascript
// View cart
JSON.parse(localStorage.getItem('tradeline_cart'))

// Clear cart
localStorage.removeItem('tradeline_cart')
```

### **User Session Data**

**Location:** Browser `localStorage`
**Key:** `user`

**What's Stored:**
```json
{
  "user": "John Doe",
  "email": "john@example.com",
  "name": "John Doe",
  "id": "507f1f77bcf86cd799439011"
}
```

**How to Check:**
1. Browser DevTools (F12)
2. **Application** tab → **Local Storage**
3. Key: `user`

**To View in Console:**
```javascript
// View user
JSON.parse(localStorage.getItem('user'))

// Logout
localStorage.removeItem('user')
```

### **User Agreement Status**

**Location:** Browser `localStorage`
**Key:** `user_agreement_signed`

**Value:** `"true"` (string)

## 🔐 Environment Variables (Backend Secrets)

**Location:** `.env.local` file in `package/` directory

**What's Stored:**
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/creditor-website
# or for cloud: mongodb+srv://user:pass@cluster.mongodb.net/dbname

# TradelineSupply API
TRADELINE_CONSUMER_KEY=your_key_here
TRADELINE_CONSUMER_SECRET=your_secret_here
TRADELINE_MARKUP_PERCENT=0

# NextAuth
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 📦 Orders Storage (Currently Client-Side)

**Location:** Browser `localStorage`
**Storage File:** `src/app/services_page/tradeline-exchange/lib/orders.ts`
**Key:** `tradeline_orders`

**Note:** Orders are currently stored in localStorage. For production, you should move this to MongoDB.

## 🔍 How to Check Database Connection

### Check if MongoDB is Connected:

1. **Look at terminal logs:**
   - When server starts, you should see: `✅ MongoDB connected successfully`
   - If you see: `❌ MongoDB connection error:` → Check your `MONGODB_URI`

2. **Check Environment Variable:**
   ```bash
   # In terminal
   echo $MONGODB_URI
   ```

3. **Test Connection in Code:**
   Create a test API route (temporary):
   ```typescript
   // GET /api/test-db
   import connectDB from "@/app/api/auth/db/mongodb";
   await connectDB();
   return NextResponse.json({ connected: true });
   ```

## 🗂️ File Structure Summary

```
Backend Storage:
├── MongoDB Database
│   └── Collection: users
│       ├── _id (ObjectId)
│       ├── name (String)
│       ├── email (String, unique)
│       ├── password (String, hashed)
│       └── createdAt (Date)
│
Frontend Storage (localStorage):
├── tradeline_cart → Cart items
├── user → User session data
└── user_agreement_signed → Agreement status
```

## 📝 Quick Reference

### View Users in Database:
```bash
# Using MongoDB Compass
1. Connect with MONGODB_URI
2. Navigate to: Database → users collection

# Using mongosh
mongosh "your_mongodb_uri"
use creditor-website
db.users.find().pretty()
```

### View Cart in Browser:
```javascript
// Browser Console (F12)
JSON.parse(localStorage.getItem('tradeline_cart'))
```

### View User Session:
```javascript
// Browser Console (F12)
JSON.parse(localStorage.getItem('user'))
```

### Check MongoDB Connection String:
```bash
# Check .env.local file
cat package/.env.local | grep MONGODB_URI
```

## 🚀 Production Recommendations

1. **Move Cart to Database** - Currently in localStorage, should be in MongoDB
2. **Move Orders to Database** - Currently in localStorage, should be in MongoDB
3. **Add Session Management** - Use secure HTTP-only cookies instead of localStorage for user data
4. **Add Database Indexes** - Already have unique index on email
5. **Add Data Backup** - Set up MongoDB backups

## 🛠️ Troubleshooting

### Issue: "MongoDB connection failed"
**Solution:**
1. Check `MONGODB_URI` in `.env.local`
2. Verify MongoDB is running (if local)
3. Check network connection (if cloud)
4. Verify credentials are correct

### Issue: Can't see users in database
**Solution:**
1. Check if signup/login actually saved users
2. Verify database name in connection string
3. Check MongoDB logs for errors
4. Try creating a test user via signup

---

**All user authentication data is stored in MongoDB!** 🎉
