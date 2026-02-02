# FieldCheck Production API

## 🚀 Production-Grade Industrial Inspection SaaS

This is a **complete, revenue-ready backend** for FieldCheck - an AI-powered industrial inspection platform.

---

## 💰 REVENUE POTENTIAL

**Target: €10,000/month**

### Pricing Model:
- **Basic:** €99/month (10 users, 200 assets, 500 inspections/month)
- **Professional:** €299/month (50 users, 1000 assets, 5000 inspections/month)  
- **Enterprise:** €999/month (Unlimited, custom features)

**Path to €10k:**
- 10 Basic customers = €990/month
- 5 Professional customers = €1,495/month
- 2 Enterprise customers = €1,998/month
- **Total: €4,483/month** (45% of goal)

Need ~22 Professional customers OR 100 Basic customers for €10k/month.

---

## 🎯 WHAT'S INCLUDED

### ✅ Core Features
- Multi-tenant SaaS architecture
- JWT authentication
- Role-based access control
- Usage limits per plan
- Company isolation

### ✅ AI Features  
- Gemini Vision image analysis
- Defect detection
- Condition assessment
- Predictive maintenance
- Automated report generation

### ✅ Payment Integration
- Stripe subscriptions
- Automatic billing
- Plan upgrades/downgrades
- Usage tracking
- Webhook handling

### ✅ Database Models
- Companies (multi-tenant)
- Users (roles & permissions)
- Assets (equipment tracking)
- Inspections (with AI analysis)
- Full audit trail

---

## 📦 SETUP (15 Minutes)

### 1. Prerequisites
```bash
- Node.js 18+
- MongoDB (Atlas recommended)
- Google Cloud account (for Gemini AI)
- Stripe account
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Environment Variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

**Required:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Random secret key
- `GEMINI_API_KEY` - Google AI API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `GCP_PROJECT_ID` - Google Cloud project
- `GCP_BUCKET_NAME` - Cloud Storage bucket

### 4. Run Locally
```bash
npm run dev
```

Server runs on `http://localhost:8080`

---

## 🚀 DEPLOYMENT

### Deploy to Google Cloud Run

```bash
# Build Docker image
docker build -t gcr.io/YOUR_PROJECT/fieldcheck-api .

# Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT/fieldcheck-api

# Deploy to Cloud Run
gcloud run deploy fieldcheck-api \
  --image gcr.io/YOUR_PROJECT/fieldcheck-api \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production"
```

### Deploy to Railway/Render
1. Connect GitHub repo
2. Set environment variables
3. Deploy

---

## 📡 API ENDPOINTS

### Authentication
```
POST /api/auth/register - Register company + admin
POST /api/auth/login - Login user
GET  /api/auth/me - Get current user
PUT  /api/auth/password - Update password
```

### Assets
```
GET    /api/assets - List assets
POST   /api/assets - Create asset
GET    /api/assets/:id - Get asset details
PUT    /api/assets/:id - Update asset
DELETE /api/assets/:id - Delete asset
```

### Inspections
```
GET    /api/inspections - List inspections
POST   /api/inspections - Create inspection
GET    /api/inspections/:id - Get inspection
PUT    /api/inspections/:id - Update inspection
POST   /api/inspections/:id/photos - Upload photos
```

### AI Analysis
```
POST /api/ai/analyze/:inspectionId - Analyze inspection
POST /api/ai/report/:inspectionId - Generate report
POST /api/ai/predict/:assetId - Predict maintenance
```

### Subscriptions
```
GET  /api/subscriptions/plans - Get available plans
POST /api/subscriptions/subscribe - Create subscription
POST /api/subscriptions/cancel - Cancel subscription
POST /api/subscriptions/upgrade - Upgrade plan
```

---

## 🔒 SECURITY

### Implemented:
✅ JWT authentication
✅ Password hashing (bcrypt)
✅ Rate limiting
✅ Helmet (security headers)
✅ CORS protection
✅ Input validation
✅ Company data isolation
✅ Role-based permissions

### Before Production:
- [ ] Enable HTTPS only
- [ ] Add API key rotation
- [ ] Implement 2FA
- [ ] Security audit
- [ ] Penetration testing
- [ ] GDPR compliance review

---

## 💳 STRIPE SETUP

### 1. Create Products in Stripe Dashboard
```
Basic Plan:
- Price: €99/month
- Copy Price ID → BASIC_PLAN_PRICE_ID

Professional Plan:
- Price: €299/month
- Copy Price ID → PRO_PLAN_PRICE_ID

Enterprise Plan:
- Price: €999/month
- Copy Price ID → ENTERPRISE_PLAN_PRICE_ID
```

### 2. Configure Webhooks
```
Endpoint: https://your-api.com/api/webhooks/stripe
Events:
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed
```

---

## 🤖 GEMINI AI SETUP

### 1. Get API Key
1. Go to https://makersuite.google.com/app/apikey
2. Create new API key
3. Add to `.env` as `GEMINI_API_KEY`

### 2. Enable APIs
- Generative Language API
- Cloud Storage API (for image uploads)

---

## 📊 MONITORING

### Recommended Tools:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Analytics** - Usage analytics
- **Stripe Dashboard** - Revenue tracking
- **MongoDB Atlas** - Database monitoring

---

## 🎯 NEXT STEPS

### Week 1: Launch MVP
- [ ] Deploy to Cloud Run
- [ ] Set up Stripe products
- [ ] Configure Gemini AI
- [ ] Test end-to-end flow
- [ ] Launch landing page

### Week 2: First Customers
- [ ] Reach out to 50 industrial companies
- [ ] Offer 30-day free trial
- [ ] Get first 3 paying customers
- [ ] Collect feedback

### Month 1: Scale to €1k MRR
- [ ] 10-15 paying customers
- [ ] Add requested features
- [ ] Improve AI accuracy
- [ ] Build case studies

### Month 3: Scale to €5k MRR
- [ ] 50+ customers
- [ ] Add enterprise features
- [ ] Hire support person
- [ ] Marketing automation

### Month 6: Scale to €10k MRR
- [ ] 100+ customers
- [ ] Full sales team
- [ ] Channel partnerships
- [ ] International expansion

---

## 💡 SALES STRATEGY

### Target Customers:
1. **Manufacturing Plants** (500+ employees)
2. **Food Processing** (HACCP compliance)
3. **Chemical Plants** (Safety critical)
4. **Utilities** (Infrastructure)
5. **Mining Operations** (Heavy equipment)

### Sales Channels:
1. **Direct Sales** - LinkedIn outreach
2. **Content Marketing** - Blog + SEO
3. **Partnerships** - Equipment manufacturers
4. **Referrals** - Incentivize existing customers
5. **Trade Shows** - Industry events

### Conversion Funnel:
1. Free 14-day trial (no credit card)
2. Onboarding call (demo + setup)
3. First inspection (show AI value)
4. Convert to paid (offer discount)
5. Expand usage (add users/assets)

---

## 📈 KEY METRICS

Track these weekly:
- **MRR** (Monthly Recurring Revenue)
- **Churn Rate** (aim <5%)
- **CAC** (Customer Acquisition Cost)
- **LTV** (Lifetime Value)
- **Trial → Paid conversion** (aim >20%)
- **Daily Active Users**
- **Inspections per day**
- **AI analysis usage**

---

## 🆘 SUPPORT

### Issues?
1. Check logs: `npm run dev` output
2. Verify environment variables
3. Check MongoDB connection
4. Test API with Postman
5. Review error messages

### Need Help?
- Documentation: `/docs` folder
- API Reference: Postman collection included
- Examples: `/examples` folder

---

## 📄 LICENSE

Proprietary - All rights reserved

---

**Built for real revenue. Deploy today, start earning tomorrow.** 🚀
