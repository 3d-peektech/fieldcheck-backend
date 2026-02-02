# ✅ FieldCheck Deployment Checklist

Copy this and check off items as you complete them!

---

## 🗄️ STEP 1: Database Setup

Choose ONE method:

### Option A: Database GUI (Easiest - Recommended)
```
[ ] Download TablePlus or pgAdmin
[ ] Create new PostgreSQL connection:
    Host: dpg-d60dup0gjchc73ef7kk0-a.oregon-postgres.render.com
    Port: 5432
    User: fieldcheck_user
    Password: KOFNdsYXCxzdXcSUVrvtBiWAZgQxYTDB
    Database: fieldcheck
[ ] Connect successfully
[ ] Open database/schema.sql file
[ ] Copy all SQL content
[ ] Paste into query window and execute
[ ] Verify tables created: users, companies, assets, inspections
```

### Option B: Command Line
```
[ ] Install PostgreSQL client (psql)
[ ] Run: ./setup-database.sh
[ ] Verify success message
```

**✅ Database Step Complete!**

---

## 🐙 STEP 2: GitHub Setup

```
[ ] Create new repo on GitHub.com
    Repo name: fieldcheck-backend
    Public or Private: (your choice)
    DON'T initialize with README
[ ] Copy your repo URL

[ ] In terminal, navigate to fieldcheck-backend folder
[ ] Run: git init
[ ] Run: git add .
[ ] Run: git commit -m "Initial commit"
[ ] Run: git remote add origin YOUR-REPO-URL
[ ] Run: git push -u origin main
[ ] Verify files appear on GitHub
```

**✅ GitHub Step Complete!**

---

## 🚀 STEP 3: Render Deployment

```
[ ] Go to https://dashboard.render.com/
[ ] Click "New +" button
[ ] Select "Web Service"
[ ] Click "Connect a repository"
[ ] Authorize Render (if first time)
[ ] Select "fieldcheck-backend" repo
[ ] Click "Connect"

Configuration:
[ ] Name: fieldcheck-backend
[ ] Region: Oregon (US West)
[ ] Branch: main
[ ] Build Command: (leave empty)
[ ] Start Command: npm start
[ ] Instance Type: Free

[ ] Click "Advanced" button

Add Environment Variables:

[ ] Variable 1:
    Key: DATABASE_URL
    Value: postgresql://fieldcheck_user:KOFNdsYXCxzdXcSUVrvtBiWAZgQxYTDB@dpg-d60dup0gjchc73ef7kk0-a.oregon-postgres.render.com/fieldcheck

[ ] Variable 2:
    Key: JWT_SECRET
    Value: a8f5f167f44f4964e6c998dee827110c8b9c9e88f5f167f44f4964e6c998dee8

[ ] Variable 3:
    Key: NODE_ENV
    Value: production

[ ] Click "Create Web Service"
[ ] Wait for deployment (3-5 minutes)
[ ] Copy your API URL: https://fieldcheck-backend-____.onrender.com
```

**✅ Deployment Step Complete!**

---

## 🧪 STEP 4: Testing

```
[ ] Save your API URL: _________________________________

[ ] Test health check in browser:
    URL: https://your-api-url.onrender.com/health
    Expected: {"status":"OK","message":"FieldCheck Backend API is running"}

[ ] Test root endpoint:
    URL: https://your-api-url.onrender.com/
    Expected: {"message":"FieldCheck API Server","version":"1.0.0"}

[ ] Test registration (in terminal):
    curl -X POST https://your-api-url.onrender.com/api/v1/auth/register \
      -H "Content-Type: application/json" \
      -d '{"email":"test@test.com","password":"test123456","firstName":"Test","lastName":"User"}'
    
    Expected: {"success":true,"data":{"user":{...},"token":"..."}}

[ ] Test login:
    curl -X POST https://your-api-url.onrender.com/api/v1/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"test@test.com","password":"test123456"}'
    
    Expected: {"success":true,"data":{"token":"..."}}
```

**✅ Testing Complete!**

---

## 🎉 FINAL VERIFICATION

```
[ ] API URL is accessible
[ ] Health endpoint returns OK
[ ] Can register new user
[ ] Can login and get JWT token
[ ] No errors in Render logs
[ ] Database has data in users table
```

---

## 📝 RECORD YOUR INFO

Write down these important details:

**Your API URL:**
```
https://fieldcheck-backend-_____________.onrender.com
```

**Your GitHub Repo:**
```
https://github.com/___________/fieldcheck-backend
```

**Render Service ID:**
```
srv-_____________________
```

**Test Account Credentials:**
```
Email: test@test.com
Password: test123456
```

---

## 🎊 SUCCESS!

If all checkboxes are marked, your API is fully deployed and working!

### What You Can Do Now:

1. ✅ Connect from mobile app
2. ✅ Make API requests
3. ✅ Register users
4. ✅ Manage companies, assets, inspections
5. ✅ Build your frontend

### Next Development Steps:

- [ ] Build React Native mobile app
- [ ] Add authentication middleware
- [ ] Implement file upload for photos
- [ ] Add Stripe payment integration
- [ ] Create admin dashboard
- [ ] Set up monitoring and alerts

---

**🚀 Your FieldCheck API is live and ready for action!**

Keep this checklist for reference!
