# Deploy to Render - Simple Guide

## Step 1: Create Render Account
1. Go to https://render.com
2. Sign up (free) with GitHub or email
3. Verify your email

## Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Choose **"Public Git repository"** OR **"Deploy without Git"**

## Step 3: Upload Your Code

### Option A: Without Git (Easiest)
Since Render doesn't have direct ZIP upload, use GitHub:

1. Go to https://github.com/new
2. Create new repository: `fieldcheck-backend`
3. Upload these files via GitHub web interface
4. Connect Render to this repo

### Option B: Use Render's Manual Deploy
1. Use Render's dashboard to paste your code
2. Or connect via GitHub (recommended)

## Step 4: Configure Service

**Build Command:**
```
npm install
```

**Start Command:**
```
node src/server.js
```

**Environment Variables:**
Add these in Render dashboard:

```
MONGODB_URI=mongodb+srv://FieldCheck:Ok%261235789qaz@fieldcheck.ukdzidj.mongodb.net/FieldCheck?retryWrites=true&w=majority

JWT_SECRET=kH8mP2vL9qR5wT3xN7bF4gJ6hK1mN8pQ

NODE_ENV=production

PORT=8080

ALLOWED_ORIGINS=*
```

## Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://fieldcheck-backend.onrender.com`

## Step 6: Test
```bash
curl https://your-app.onrender.com/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "environment": "production",
  "database": "connected"
}
```

## Your Production URL
After deployment, your API will be at:
```
https://fieldcheck-backend-xxxx.onrender.com
```

Use this URL in your Android app!

## Free Tier Limits
- ✅ Free forever
- ✅ 750 hours/month
- ⚠️ Spins down after 15 min of inactivity
- ⚠️ Takes 30 sec to wake up

For production, upgrade to paid ($7/mo) for:
- No spin down
- Faster performance
- More hours
