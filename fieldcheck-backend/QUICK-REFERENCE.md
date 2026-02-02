# 📋 FieldCheck Backend - Quick Reference

## 🔗 Your Resources

### Render Dashboard
- Main: https://dashboard.render.com/
- Database: https://dashboard.render.com/ (find fieldcheck-db)
- Web Service: (after deployment)

### API URL (After Deployment)
```
https://fieldcheck-backend-xxxx.onrender.com
```

---

## ⚡ Quick Commands

### Deploy to Render
```bash
git add .
git commit -m "Update"
git push origin main
```
(Render auto-deploys on push)

### Test API
```bash
# Health check
curl https://your-api.onrender.com/health

# Root
curl https://your-api.onrender.com/
```

### Connect to Database
```bash
psql "YOUR_DATABASE_URL"
```

---

## 🔑 Environment Variables (Add in Render)

```env
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-random-secret-key
NODE_ENV=production
```

---

## 📌 All API Endpoints

### Public (No Auth)
- POST `/api/v1/auth/register` - Register
- POST `/api/v1/auth/login` - Login

### Users
- GET `/api/v1/users` - List all
- GET `/api/v1/users/:id` - Get one
- PUT `/api/v1/users/:id` - Update
- DELETE `/api/v1/users/:id` - Delete

### Companies
- GET `/api/v1/companies` - List all
- POST `/api/v1/companies` - Create
- GET `/api/v1/companies/:id` - Get one
- PUT `/api/v1/companies/:id` - Update
- DELETE `/api/v1/companies/:id` - Delete

### Assets
- GET `/api/v1/assets` - List all
- POST `/api/v1/assets` - Create
- GET `/api/v1/assets/:id` - Get one
- PUT `/api/v1/assets/:id` - Update
- DELETE `/api/v1/assets/:id` - Delete

### Inspections
- GET `/api/v1/inspections` - List all
- POST `/api/v1/inspections` - Create
- GET `/api/v1/inspections/:id` - Get one
- PUT `/api/v1/inspections/:id` - Update
- DELETE `/api/v1/inspections/:id` - Delete

### Sync
- GET `/api/v1/sync/status` - Sync status
- POST `/api/v1/sync/upload` - Upload data
- GET `/api/v1/sync/download` - Download data

---

## 📦 Project Files

```
fieldcheck-backend/
├── server.js              # Main app
├── package.json           # Dependencies
├── .env.example          # Environment template
├── README.md             # Full documentation
├── DEPLOYMENT.md         # Deployment guide
├── config/
│   └── database.js       # DB config
├── database/
│   └── schema.sql        # Database schema
└── routes/
    ├── auth.js           # Authentication
    ├── users.js          # User management
    ├── companies.js      # Company management
    ├── assets.js         # Asset management
    ├── inspections.js    # Inspections
    └── sync.js           # Data sync
```

---

## 🚨 Common Issues

### 404 on all routes
✅ Check routes imported in server.js
✅ Verify deployment succeeded
✅ Check Render logs

### Database errors
✅ Verify DATABASE_URL is set
✅ Check database is running
✅ Run schema.sql

### Authentication fails
✅ Check JWT_SECRET is set
✅ Verify password hashing works
✅ Check user exists in database

---

## 📱 Test with cURL

### Register
```bash
curl -X POST https://your-api.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","firstName":"Test","lastName":"User"}'
```

### Login
```bash
curl -X POST https://your-api.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Create Company
```bash
curl -X POST https://your-api.onrender.com/api/v1/companies \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Co","address":"123 St","industry":"Tech"}'
```

---

## 💡 Tips

1. **Free tier limitations:** 
   - Service spins down after 15 min inactivity
   - First request after downtime takes 30-60 sec

2. **Monitoring:**
   - Check logs regularly in Render dashboard
   - Set up error alerts
   - Monitor database usage

3. **Development:**
   - Test locally before pushing
   - Use environment variables
   - Never commit .env file

4. **Security:**
   - Always use HTTPS
   - Validate all inputs
   - Keep dependencies updated

---

**Save this file for quick reference! 📌**
