# 🔍 How to Check Your Backend Database

## 📊 Where Data is Stored

### **Backend (Server-Side) - MongoDB**

✅ **User Accounts** - Stored in MongoDB
- Location: MongoDB Database
- Collection: `users`
- Fields: `_id`, `name`, `email`, `password` (hashed), `createdAt`

### **Frontend (Browser) - localStorage**

✅ **Cart Items** - Stored in Browser
- Key: `tradeline_cart`
- Location: Browser localStorage

✅ **User Session** - Stored in Browser
- Key: `user`
- Location: Browser localStorage

✅ **Orders** - Stored in Browser (should move to DB in production)
- Key: `tradeline_orders`
- Location: Browser localStorage

---

## 🔧 Step-by-Step: Check Your MongoDB Database

### Step 1: Find Your MongoDB Connection String

**Check `.env.local` file:**
```bash
# Look for this line:
MONGODB_URI=mongodb://localhost:27017/creditor-website
# or
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
```

### Step 2: Check Users in Database

#### Option A: Using MongoDB Compass (Easiest - GUI)

1. **Download MongoDB Compass:**
   - Visit: https://www.mongodb.com/products/compass
   - Download and install

2. **Connect to Database:**
   - Open MongoDB Compass
   - Paste your `MONGODB_URI` from `.env.local`
   - Click "Connect"

3. **View Users:**
   - Click on your database name (e.g., `creditor-website`)
   - Click on `users` collection
   - See all registered users!

#### Option B: Using MongoDB Shell (Command Line)

```bash
# Install MongoDB Shell (if not installed)
# Download from: https://www.mongodb.com/try/download/shell

# Connect to your database
mongosh "your_mongodb_uri_here"

# Or if local MongoDB
mongosh

# Use your database
use creditor-website

# View all users
db.users.find().pretty()

# Count users
db.users.countDocuments()

# Find user by email
db.users.findOne({ email: "user@example.com" })

# Find all users (simplified)
db.users.find({}, { name: 1, email: 1, createdAt: 1, _id: 1 })
```

#### Option C: Create Admin API Route (For Testing)

Create a temporary admin route to view users:

```typescript
// File: src/app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { userStore } from "@/app/api/auth/users-store";

export async function GET() {
  try {
    const users = await userStore.getAll(); // Gets all users without passwords
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

Then visit: `http://localhost:3000/api/admin/users`

⚠️ **Remove this route in production!**

---

## 🌐 Check Browser Storage (localStorage)

### View Cart Data:

**Method 1: Browser DevTools**
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Local Storage** → Your domain
4. Look for key: `tradeline_cart`
5. View the JSON data

**Method 2: Browser Console**
```javascript
// View cart
JSON.parse(localStorage.getItem('tradeline_cart'))

// View user
JSON.parse(localStorage.getItem('user'))

// View orders
JSON.parse(localStorage.getItem('tradeline_orders'))
```

---

## 🔐 Check MongoDB Connection

### Method 1: Check Terminal Logs

When you start the server (`npm run dev`), look for:
- ✅ `✅ MongoDB connected successfully` → Connected!
- ❌ `❌ MongoDB connection error:` → Connection failed

### Method 2: Test Connection API

Create a test endpoint:

```typescript
// File: src/app/api/test-db/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/api/auth/db/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      connected: true,
      message: "MongoDB connected successfully" 
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        connected: false,
        error: error.message 
      },
      { status: 500 }
    );
  }
}
```

Visit: `http://localhost:3000/api/test-db`

---

## 📝 Quick Database Queries

### View All Users:
```javascript
// MongoDB Shell
db.users.find().pretty()

// Or with selected fields only
db.users.find({}, { name: 1, email: 1, createdAt: 1 })
```

### Find User by Email:
```javascript
db.users.findOne({ email: "user@example.com" })
```

### Count Total Users:
```javascript
db.users.countDocuments()
```

### View User Creation Dates:
```javascript
db.users.find({}, { name: 1, email: 1, createdAt: 1 }).sort({ createdAt: -1 })
```

### Delete a User (Careful!):
```javascript
db.users.deleteOne({ email: "user@example.com" })
```

---

## 🗄️ Database Schema

### Users Collection:
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$hashed...",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Database Name:
- Default: `creditor-website`
- Or whatever you set in `MONGODB_URI`

---

## 🚀 Production Database Options

### MongoDB Atlas (Cloud - Recommended)
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Get connection string
4. Add to `.env.local`: `MONGODB_URI=mongodb+srv://...`

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `MONGODB_URI=mongodb://localhost:27017/creditor-website`

---

## ✅ Verification Checklist

- [ ] MongoDB URI is set in `.env.local`
- [ ] Terminal shows "✅ MongoDB connected successfully"
- [ ] Can view users in MongoDB Compass or mongosh
- [ ] New signups create users in database
- [ ] Login can find users by email

---

**Your user data is safely stored in MongoDB!** 🎉
