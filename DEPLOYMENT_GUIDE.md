# FieldCheck - Complete Deployment Guide

## 🎯 GOAL: Get to €10k/month in 6 months

This guide will get your production SaaS running in **under 1 hour**.

---

## 📋 CHECKLIST

### Phase 1: Setup (30 minutes)
- [ ] Create MongoDB Atlas database
- [ ] Get Gemini API key
- [ ] Create Stripe account
- [ ] Set up Google Cloud project
- [ ] Configure environment variables

### Phase 2: Deploy Backend (20 minutes)
- [ ] Deploy to Cloud Run / Railway / Render
- [ ] Test API endpoints
- [ ] Configure webhooks

### Phase 3: Deploy Android App (10 minutes)
- [ ] Update API URL in app
- [ ] Build release APK
- [ ] Test on device

### Phase 4: Go to Market (Ongoing)
- [ ] Create landing page
- [ ] Set up email (Mailchimp)
- [ ] Create pricing page
- [ ] Launch on Product Hunt
- [ ] Reach out to first 10 prospects

---

## 1️⃣ MONGODB SETUP

### Create Free Cluster:
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create Free Cluster (M0)
4. Set username/password
5. Add IP: `0.0.0.0/0` (allow all)
6. Get connection string
7. Save as `MONGODB_URI`

**Example:**
```
mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/fieldcheck?retryWrites=true&w=majority
```

---

## 2️⃣ GEMINI AI SETUP

### Get API Key:
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Select or create project
4. Copy API key
5. Save as `GEMINI_API_KEY`

**Cost:** ~€0.001 per image analysis (very cheap!)

---

## 3️⃣ STRIPE SETUP

### Create Account:
1. Go to https://stripe.com
2. Sign up
3. Go to Developers → API keys
4. Copy **Secret key** (starts with `sk_test_`)
5. Save as `STRIPE_SECRET_KEY`

### Create Products:
```
Product 1: FieldCheck Basic
- Price: €99/month
- Copy Price ID → BASIC_PLAN_PRICE_ID

Product 2: FieldCheck Professional
- Price: €299/month
- Copy Price ID → PRO_PLAN_PRICE_ID

Product 3: FieldCheck Enterprise
- Price: €999/month
- Copy Price ID → ENTERPRISE_PLAN_PRICE_ID
```

### Set up Webhook:
```
URL: https://your-api-url.com/api/webhooks/stripe
Events:
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed

Copy Signing Secret → STRIPE_WEBHOOK_SECRET
```

---

## 4️⃣ GOOGLE CLOUD SETUP

### Create Project:
1. Go to https://console.cloud.google.com
2. Create new project: "fieldcheck-prod"
3. Enable APIs:
   - Cloud Run API
   - Cloud Storage API
   - Container Registry API

### Create Storage Bucket:
```bash
gsutil mb gs://fieldcheck-uploads
gsutil iam ch allUsers:objectViewer gs://fieldcheck-uploads
```

Save bucket name as `GCP_BUCKET_NAME`

---

## 5️⃣ DEPLOY TO CLOUD RUN

### Option A: Using gcloud CLI

```bash
# Install Google Cloud SDK first
# https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Build and deploy
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/fieldcheck-api

gcloud run deploy fieldcheck-api \
  --image gcr.io/YOUR_PROJECT_ID/fieldcheck-api \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars="MONGODB_URI=your_uri,JWT_SECRET=your_secret,GEMINI_API_KEY=your_key,STRIPE_SECRET_KEY=your_key"
```

### Option B: Using Railway (Easiest)

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select `backend` folder
5. Add environment variables:
   ```
   MONGODB_URI
   JWT_SECRET
   GEMINI_API_KEY
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   GCP_PROJECT_ID
   GCP_BUCKET_NAME
   ```
6. Deploy!

Your API will be at: `https://fieldcheck-production-xxxx.up.railway.app`

---

## 6️⃣ TEST API

### Using curl:

```bash
# Health check
curl https://your-api-url.com/health

# Register company
curl -X POST https://your-api-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }'

# You'll get a token back - use it for authenticated requests
```

---

## 7️⃣ UPDATE ANDROID APP

### Edit API URL:
```kotlin
// In NetworkModule.kt
private const val BASE_URL = "https://your-api-url.com/api/v1/"
```

### Build Release APK:
```bash
cd android
./gradlew assembleRelease

# APK will be at:
# app/build/outputs/apk/release/app-release.apk
```

---

## 8️⃣ GO TO MARKET

### Week 1: Landing Page
- Use Carrd/Webflow/Framer
- Show: Problem → Solution → Pricing → CTA
- Add demo video
- Collect emails

### Week 2: First Outreach
Target 50 companies:
```
Subject: Cut inspection time in half with AI

Hi [Name],

I noticed [Company] operates [X equipment]. 

We built FieldCheck - an AI-powered inspection app 
that automatically detects issues and predicts failures.

Early customers are saving 10+ hours/week on inspections.

Worth a 15-minute demo?

Best,
[Your name]
```

### Week 3: Content Marketing
- Write blog: "5 Ways AI is Changing Industrial Maintenance"
- Post on LinkedIn
- Share in industry forums

### Week 4: Iterate
- Get feedback from first users
- Fix bugs
- Add requested features
- Get testimonials

---

## 💰 PRICING STRATEGY

### Trial Strategy:
- 14 days free
- No credit card required
- Full features
- Personal onboarding call

### Conversion Tactics:
1. Email on day 3: "Need help getting started?"
2. Email on day 7: "Here's what you're missing"
3. Email on day 12: "Lock in 20% discount"
4. Email on day 14: "Your trial ends tomorrow"

### Upsell Path:
```
Trial (€0) 
  ↓
Basic (€99/mo) - 60% of customers
  ↓
Professional (€299/mo) - 30% of customers
  ↓
Enterprise (€999/mo) - 10% of customers
```

---

## 📊 REVENUE PROJECTIONS

### Conservative (6 months):
```
Month 1: 5 customers × €99 = €495
Month 2: 10 customers × €99 = €990
Month 3: 20 customers × €149* = €2,980
Month 4: 35 customers × €149 = €5,215
Month 5: 50 customers × €149 = €7,450
Month 6: 70 customers × €149 = €10,430

*Mix of Basic + Professional
```

### Aggressive (3 months):
```
Month 1: 10 × €99 + 2 × €299 = €1,588
Month 2: 25 × €99 + 8 × €299 = €4,867
Month 3: 45 × €99 + 20 × €299 = €10,435
```

---

## 🎯 KEY SUCCESS METRICS

### Track Weekly:
- Signups
- Trial → Paid conversion (aim: >20%)
- MRR growth (aim: +20% weekly)
- Churn rate (aim: <5% monthly)
- Support tickets (aim: <2 per customer)

### Growth Levers:
1. **Improve conversion:** Better onboarding
2. **Reduce churn:** Proactive support
3. **Increase ACV:** Upsell features
4. **Faster sales:** Automate demos
5. **Lower CAC:** Content marketing

---

## 🆘 TROUBLESHOOTING

### API not responding:
```bash
# Check logs
gcloud logging read "resource.type=cloud_run_revision" --limit 50
```

### Database connection failed:
- Check IP whitelist in MongoDB Atlas
- Verify connection string
- Test with MongoDB Compass

### Stripe webhook not working:
- Check webhook URL in Stripe dashboard
- Verify signing secret
- Test with Stripe CLI

### Android app crashing:
- Check Logcat
- Verify API URL
- Test API manually with Postman

---

## 📞 SUPPORT

Need help deploying? Common issues:
1. **"MongoDB connection failed"** → Check IP whitelist
2. **"Gemini API error"** → Verify API key is correct
3. **"Stripe webhook failed"** → Check signing secret
4. **"Cloud Run deployment failed"** → Check Dockerfile

---

## 🚀 YOU'RE READY!

Your production SaaS is now live. Time to get customers!

**Next steps:**
1. Test the complete flow yourself
2. Get 3 beta users
3. Collect feedback
4. Iterate
5. Scale to €10k/month

**You have everything you need. Now go sell!** 💰
