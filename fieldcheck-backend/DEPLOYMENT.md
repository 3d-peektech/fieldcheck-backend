# 🚀 FieldCheck Backend - Complete Deployment Guide

## Step-by-Step Instructions to Get Your API Live

### ✅ Prerequisites Checklist

- [ ] GitHub account
- [ ] Render account (free)
- [ ] Render database `fieldcheck-db` is running
- [ ] Backend code downloaded

---

## 📦 Part 1: Push Code to GitHub

### 1. Create a New GitHub Repository

1. Go to https://github.com/new
2. Name: `fieldcheck-backend`
3. Keep it Public or Private
4. **Don't** initialize with README (we have one)
5. Click "Create repository"

### 2. Push Your Code

```bash
# Navigate to your backend folder
cd fieldcheck-backend

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: FieldCheck Backend API"

# Add your GitHub repo as remote (replace with YOUR url)
git remote add origin https://github.com/YOUR-USERNAME/fieldcheck-backend.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 Part 2: Deploy to Render

### 1. Create Web Service

1. Go to https://dashboard.render.com/
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### 2. Connect Repository

1. Click **"Connect a repository"**
2. If first time: Authorize Render to access GitHub
3. Find and select **"fieldcheck-backend"**
4. Click **"Connect"**

### 3. Configure Service Settings

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `fieldcheck-backend` |
| **Region** | Choose closest to your location |
| **Branch** | `main` |
| **Root Directory** | (leave empty) |
| **Environment** | `Node` |
| **Build Command** | (leave empty) |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### 4. Add Environment Variables

**IMPORTANT:** Click **"Advanced"** to add environment variables

Add these 3 variables:

#### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: <Get from your fieldcheck-db dashboard>
```

**How to get DATABASE_URL:**
1. Open new tab: https://dashboard.render.com/
2. Click on **"fieldcheck-db"** database
3. Scroll down to **"Connections"**
4. Copy the **"External Database URL"**
5. Paste it as the value

#### Variable 2: JWT_SECRET
```
Key: JWT_SECRET
Value: <Generate a random string>
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Or use this temporary one:
```
a8f5f167f44f4964e6c998dee827110c
```

#### Variable 3: NODE_ENV
```
Key: NODE_ENV
Value: production
```

### 5. Deploy!

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Watch the logs for any errors

---

## 💾 Part 3: Set Up Database

### Get Your Database Connection Info

1. Go to your `fieldcheck-db` dashboard
2. Note these details:
   - **Host** (e.g., `dpg-xxxxx.render.com`)
   - **Port** (usually `5432`)
   - **Database** (e.g., `fieldcheck_db_xxxx`)
   - **Username** (e.g., `fieldcheck_db_user`)
   - **Password** (copy the password)

### Option A: Using psql Command Line

```bash
# Connect to your database
psql "postgresql://username:password@host:port/database"

# Once connected, copy and paste the schema
# Open database/schema.sql and paste the entire contents
```

### Option B: Using a GUI Tool (Easier)

**Recommended Tools:**
- [TablePlus](https://tableplus.com/) (Mac/Windows)
- [pgAdmin](https://www.pgadmin.org/) (All platforms)
- [DBeaver](https://dbeaver.io/) (All platforms)

**Steps:**
1. Download and install TablePlus (or your preferred tool)
2. Create new connection:
   - Type: PostgreSQL
   - Host: (from your database dashboard)
   - Port: 5432
   - User: (from your database dashboard)
   - Password: (from your database dashboard)
   - Database: (from your database dashboard)
3. Connect
4. Open Query window
5. Copy entire contents of `database/schema.sql`
6. Paste and run
7. ✅ Database is ready!

---

## 🧪 Part 4: Test Your API

### 1. Find Your API URL

After deployment completes:
- Look for: **"Your service is live at"**
- URL format: `https://fieldcheck-backend-xxxx.onrender.com`

### 2. Test Health Endpoint

```bash
curl https://fieldcheck-backend-xxxx.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "FieldCheck Backend API is running",
  "timestamp": "2026-02-02...",
  "version": "1.0.0"
}
```

### 3. Test Root Endpoint

Visit in browser:
```
https://fieldcheck-backend-xxxx.onrender.com/
```

You should see:
```json
{
  "message": "FieldCheck API Server",
  "version": "1.0.0",
  "status": "running",
  "endpoints": { ... }
}
```

### 4. Test Registration

```bash
curl -X POST https://fieldcheck-backend-xxxx.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"test123456",
    "firstName":"Test",
    "lastName":"User"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

---

## 🎯 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Web service created on Render
- [ ] Environment variables configured
- [ ] Database schema created
- [ ] Health check works
- [ ] Registration endpoint works
- [ ] Login endpoint works

---

## 🐛 Troubleshooting

### "Application failed to respond"
- Check Render logs
- Verify `npm start` command in package.json
- Ensure port binds to `0.0.0.0`

### "Database connection failed"
- Verify DATABASE_URL is correct
- Check database is running
- Ensure external connections are allowed

### "Route not found"
- Check routes are imported in server.js
- Verify URL path is correct
- Check for typos in route definitions

### Service keeps restarting
- Check logs for errors
- Verify all dependencies in package.json
- Ensure Node version compatibility

---

## 📞 Need Help?

1. Check Render logs: Dashboard → Your Service → Logs
2. Check database: Dashboard → fieldcheck-db → Logs
3. Test locally first: `npm start` in your project
4. Review error messages carefully

---

## 🎉 Next Steps After Deployment

1. ✅ API is live and working
2. 🔜 Build mobile app
3. 🔜 Add authentication middleware
4. 🔜 Implement file uploads
5. 🔜 Add Stripe payments
6. 🔜 Create admin dashboard

---

**Congratulations! Your FieldCheck API is now live! 🚀**
