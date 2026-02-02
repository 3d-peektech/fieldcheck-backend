# 🚀 YOUR FieldCheck Backend Deployment Guide

## Your Database is Ready!
✅ Database URL: `postgresql://fieldcheck_user:...@dpg-d60dup0gjchc73ef7kk0-a.oregon-postgres.render.com/fieldcheck`

---

## 📋 Quick Deployment Checklist

### ✅ Step 1: Set Up Database Tables (5 minutes)

You have **TWO OPTIONS**:

#### **Option A: Using the Setup Script (Easiest)**

If you have PostgreSQL installed locally:

```bash
# Navigate to your project folder
cd fieldcheck-backend

# Run the setup script
./setup-database.sh
```

This will automatically create all your tables!

#### **Option B: Using a Database GUI (Recommended for beginners)**

1. **Download TablePlus** (Free): https://tableplus.com/
   - Or use pgAdmin: https://www.pgadmin.org/

2. **Create New Connection:**
   - Type: `PostgreSQL`
   - Host: `dpg-d60dup0gjchc73ef7kk0-a.oregon-postgres.render.com`
   - Port: `5432`
   - User: `fieldcheck_user`
   - Password: `KOFNdsYXCxzdXcSUVrvtBiWAZgQxYTDB`
   - Database: `fieldcheck`
   - SSL: `Enabled`

3. **Connect and Run Schema:**
   - Open a query window
   - Copy the entire contents of `database/schema.sql`
   - Paste and execute
   - ✅ Done! Tables created

#### **Option C: Command Line (For developers)**

```bash
psql "postgresql://fieldcheck_user:KOFNdsYXCxzdXcSUVrvtBiWAZgQxYTDB@dpg-d60dup0gjchc73ef7kk0-a.oregon-postgres.render.com/fieldcheck" -f database/schema.sql
```

---

### ✅ Step 2: Push to GitHub (3 minutes)

```bash
# Navigate to your project
cd fieldcheck-backend

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: FieldCheck Backend API"

# Create a repo on GitHub (go to github.com/new)
# Then connect it:
git remote add origin https://github.com/YOUR-USERNAME/fieldcheck-backend.git

# Push
git push -u origin main
```

---

### ✅ Step 3: Deploy on Render (5 minutes)

1. **Go to Render Dashboard:**
   - https://dashboard.render.com/

2. **Create New Web Service:**
   - Click **"New +"** → **"Web Service"**
   - Click **"Connect a repository"**
   - Select your `fieldcheck-backend` repo
   - Click **"Connect"**

3. **Configure Settings:**
   ```
   Name: fieldcheck-backend
   Region: Oregon (US West) - closest to your database
   Branch: main
   Build Command: (leave empty)
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables:**
   
   Click **"Advanced"** and add these 3 variables:

   **Variable 1:**
   ```
   DATABASE_URL
   postgresql://fieldcheck_user:KOFNdsYXCxzdXcSUVrvtBiWAZgQxYTDB@dpg-d60dup0gjchc73ef7kk0-a.oregon-postgres.render.com/fieldcheck
   ```

   **Variable 2:**
   ```
   JWT_SECRET
   a8f5f167f44f4964e6c998dee827110c8b9c9e88f5f167f44f4964e6c998dee8
   ```

   **Variable 3:**
   ```
   NODE_ENV
   production
   ```

5. **Deploy:**
   - Click **"Create Web Service"**
   - Wait 3-5 minutes
   - Your API will be live! 🎉

---

### ✅ Step 4: Test Your API (2 minutes)

Once deployment completes, you'll get a URL like:
```
https://fieldcheck-backend-xxxx.onrender.com
```

**Test it:**

1. **Health Check** (in browser):
   ```
   https://your-api-url.onrender.com/health
   ```
   Should return: `{"status":"OK"...}`

2. **Register a User** (in terminal):
   ```bash
   curl -X POST https://your-api-url.onrender.com/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email":"test@example.com",
       "password":"test123456",
       "firstName":"Test",
       "lastName":"User"
     }'
   ```

3. **Login:**
   ```bash
   curl -X POST https://your-api-url.onrender.com/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email":"test@example.com",
       "password":"test123456"
     }'
   ```

You should get back a JWT token! 🎉

---

## 🎯 What You Just Built

✅ Complete REST API with 30+ endpoints
✅ PostgreSQL database with 4 tables
✅ User authentication with JWT
✅ Password hashing with bcrypt
✅ CRUD operations for:
   - Users
   - Companies
   - Assets
   - Inspections
✅ Data synchronization endpoints
✅ Security middleware (CORS, Helmet)
✅ Input validation
✅ Professional error handling

---

## 📱 All Your API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Companies
- `GET /api/v1/companies` - Get all companies
- `GET /api/v1/companies/:id` - Get company by ID
- `POST /api/v1/companies` - Create company
- `PUT /api/v1/companies/:id` - Update company
- `DELETE /api/v1/companies/:id` - Delete company

### Assets
- `GET /api/v1/assets` - Get all assets
- `GET /api/v1/assets/:id` - Get asset by ID
- `POST /api/v1/assets` - Create asset
- `PUT /api/v1/assets/:id` - Update asset
- `DELETE /api/v1/assets/:id` - Delete asset

### Inspections
- `GET /api/v1/inspections` - Get all inspections
- `GET /api/v1/inspections/:id` - Get inspection by ID
- `POST /api/v1/inspections` - Create inspection
- `PUT /api/v1/inspections/:id` - Update inspection
- `DELETE /api/v1/inspections/:id` - Delete inspection

### Sync
- `GET /api/v1/sync/status` - Get sync status
- `POST /api/v1/sync/upload` - Upload data
- `GET /api/v1/sync/download` - Download data
- `POST /api/v1/sync/resolve-conflicts` - Resolve conflicts

---

## 🐛 Troubleshooting

### Database Connection Issues
**Problem:** "Connection refused" or "timeout"
**Solution:** 
- Verify DATABASE_URL is exactly as shown above
- Check your database is running in Render dashboard
- Ensure SSL is enabled in connection

### Deployment Failures
**Problem:** Build fails or service won't start
**Solution:**
- Check Render logs for specific error
- Verify all environment variables are set
- Ensure `npm start` works locally

### 404 Errors
**Problem:** All routes return "Not Found"
**Solution:**
- Wait for deployment to fully complete (3-5 min)
- Check service status in Render dashboard
- Verify routes in server.js

---

## 🎉 Success Checklist

- [ ] Database tables created
- [ ] Code pushed to GitHub
- [ ] Web service deployed on Render
- [ ] Environment variables configured
- [ ] Health check returns OK
- [ ] Can register a user
- [ ] Can login and get JWT token

---

## 📞 Next Steps

Now that your API is live:

1. **Build Mobile App** - Use React Native to connect to your API
2. **Add File Uploads** - For inspection photos
3. **Integrate Stripe** - For payment processing
4. **Create Admin Panel** - Web dashboard for management
5. **Add Real-time Updates** - WebSocket notifications
6. **Deploy Frontend** - Host your web interface

---

## 💡 Important Notes

- **Free Tier Limitations:** Service sleeps after 15 minutes of inactivity
- **First Request:** Takes 30-60 seconds to wake up
- **Database:** 1GB storage on free tier
- **Keep Active:** Make a request every 14 minutes to keep it awake

---

## 🔗 Useful Links

- **Render Dashboard:** https://dashboard.render.com/
- **Your Database:** https://dashboard.render.com/ (find fieldcheck-db)
- **GitHub Repo:** (your repo URL)
- **API Documentation:** See README.md

---

**🎊 Congratulations! Your FieldCheck API is now live and ready to use!**

Questions? Check the full documentation in README.md or DEPLOYMENT.md
