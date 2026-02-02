# 🎯 FieldCheck Backend - 5-Minute Setup Guide

## Get Your API Running in 5 Simple Steps!

---

### 📥 STEP 1: Get Your Database Connection (2 minutes)

**What to do:**
1. Go to Render: https://dashboard.render.com/
2. Click on **"fieldcheck-db"**
3. Scroll to **"Connections"** section
4. **COPY** the "External Database URL"
5. Save it somewhere - you'll need it in Step 4!

**It looks like:**
```
postgresql://user:password@dpg-xxxxx.render.com:5432/database_name
```

✅ **Checkpoint:** You have your database URL copied

---

### 🚀 STEP 2: Deploy to Render (3 minutes)

**2A. Upload to GitHub:**
```bash
# Open terminal in your fieldcheck-backend folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/fieldcheck-backend.git
git push -u origin main
```

**2B. Create Web Service:**
1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Fill in:
   - Name: `fieldcheck-backend`
   - Environment: `Node`
   - Build Command: (leave empty)
   - Start Command: `npm start`
   - Plan: `Free`

✅ **Checkpoint:** Service created (don't click "Create" yet!)

---

### 🔐 STEP 3: Add Environment Variables (1 minute)

**Still on the Render setup page:**

Click **"Advanced"** button

Add these 3 variables:

**Variable 1:**
```
Key: DATABASE_URL
Value: <paste your database URL from Step 1>
```

**Variable 2:**
```
Key: JWT_SECRET
Value: your-super-secret-key-123
```

**Variable 3:**
```
Key: NODE_ENV
Value: production
```

✅ **Checkpoint:** All 3 variables added

---

### 💾 STEP 4: Set Up Database Tables (2 minutes)

**Option A - Easy Way (TablePlus):**
1. Download TablePlus: https://tableplus.com/
2. Create new connection with your database details
3. Open `database/schema.sql`
4. Copy all the SQL
5. Paste in TablePlus and run

**Option B - Command Line:**
```bash
psql "YOUR_DATABASE_URL"
# Then paste contents of database/schema.sql
```

✅ **Checkpoint:** Tables created in database

---

### ✅ STEP 5: Deploy & Test (1 minute)

**5A. Deploy:**
1. Click **"Create Web Service"**
2. Wait 2-3 minutes
3. Look for: "Your service is live at..."
4. Copy your API URL

**5B. Test it works:**

Open in browser:
```
https://your-api-url.onrender.com/health
```

You should see:
```json
{
  "status": "OK",
  "message": "FieldCheck Backend API is running"
}
```

✅ **Checkpoint:** API is live! 🎉

---

## 🎊 Success! What You Built:

✅ Complete REST API with authentication
✅ Database with users, companies, assets, inspections
✅ Secure JWT authentication
✅ Professional error handling
✅ Ready for mobile app integration
✅ Free hosting on Render

---

## 🧪 Quick Test

**Register a user:**
```bash
curl -X POST https://your-api-url/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"me@test.com","password":"test123","firstName":"My","lastName":"Name"}'
```

**You should get back:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

---

## 📝 Your API Endpoints

All working and ready to use:

**Authentication:**
- POST `/api/v1/auth/register` - Create account
- POST `/api/v1/auth/login` - Sign in

**Data Management:**
- `/api/v1/users` - User management
- `/api/v1/companies` - Companies
- `/api/v1/assets` - Assets/Equipment
- `/api/v1/inspections` - Inspections
- `/api/v1/sync` - Data synchronization

---

## 🚨 Troubleshooting

**"Service won't start"**
→ Check Render logs for errors
→ Verify DATABASE_URL is correct

**"Database connection failed"**
→ Ensure database is running
→ Check external connections allowed

**"Routes return 404"**
→ Wait for deployment to complete
→ Check URL is correct

**Still stuck?**
→ Check DEPLOYMENT.md for detailed help
→ Review Render service logs

---

## 📚 What's Next?

1. ✅ Backend API deployed
2. 🔜 Build mobile app (React Native)
3. 🔜 Add file uploads for photos
4. 🔜 Integrate Stripe payments
5. 🔜 Create admin dashboard
6. 🔜 Add real-time notifications

---

## 💡 Pro Tips

- **First request is slow:** Free tier spins down after 15 min
- **Monitor usage:** Check Render dashboard regularly
- **Keep database updated:** Back up important data
- **Test thoroughly:** Use Postman or similar tools

---

**🎉 Congratulations! Your FieldCheck API is live and ready to power your mobile app!**

Need the full documentation? Check:
- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Detailed deployment guide
- `QUICK-REFERENCE.md` - All endpoints and commands
