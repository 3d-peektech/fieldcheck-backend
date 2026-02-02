# 🔧 FieldCheck Backend API

Complete backend API for FieldCheck - Asset Inspection and Management System

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Render)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd fieldcheck-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. **Set up database**
- Go to your Render Database dashboard
- Copy the "External Database URL"
- Run the schema: `database/schema.sql` in your database

5. **Start the server**
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## 🌐 Deploy to Render

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: FieldCheck Backend API"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Create Web Service on Render

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `fieldcheck-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Build Command:** (leave empty)
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 3: Add Environment Variables

In Render Dashboard → Environment, add:

```
DATABASE_URL=<your-postgres-external-url>
JWT_SECRET=<generate-a-random-string>
NODE_ENV=production
```

**Get DATABASE_URL:**
1. Go to your `fieldcheck-db` database dashboard
2. Copy "External Database URL"
3. Paste it as DATABASE_URL

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Deploy

Click **"Manual Deploy"** → **"Deploy latest commit"**

Your API will be live at: `https://fieldcheck-backend-<random>.onrender.com`

## 📊 Set Up Database

### Option 1: Using psql (Recommended)

```bash
# Connect to your Render database
psql <your-external-database-url>

# Run the schema
\i database/schema.sql
```

### Option 2: Using Render Dashboard

1. Go to your database dashboard
2. Click "Connect" → "External Connection"
3. Use any PostgreSQL client (TablePlus, pgAdmin, DBeaver)
4. Copy and paste the contents of `database/schema.sql`

## 🔌 API Endpoints

### Health & Info
- `GET /` - API information
- `GET /health` - Health check

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

## 🧪 Testing

### Using cURL

```bash
# Health check
curl https://your-api-url.onrender.com/health

# Register user
curl -X POST https://your-api-url.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST https://your-api-url.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Using Postman/Insomnia

Import the endpoints:
- Base URL: `https://your-api-url.onrender.com`
- All routes are documented above

## 📁 Project Structure

```
fieldcheck-backend/
├── config/
│   └── database.js       # Database configuration
├── database/
│   └── schema.sql        # Database schema
├── middleware/
│   └── (auth, validation, etc.)
├── models/
│   └── (database models)
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── users.js          # User management
│   ├── companies.js      # Company management
│   ├── assets.js         # Asset management
│   ├── inspections.js    # Inspection management
│   └── sync.js           # Data synchronization
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── server.js             # Main application file
└── README.md
```

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ CORS enabled
- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Input validation
- ✅ SQL injection protection (parameterized queries)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 3000) | No |

## 📝 Next Steps

1. ✅ Deploy API to Render
2. ✅ Set up database schema
3. ✅ Test all endpoints
4. 🔲 Add authentication middleware
5. 🔲 Implement file uploads (for inspection photos)
6. 🔲 Add Stripe payment integration
7. 🔲 Build mobile app (React Native)
8. 🔲 Add comprehensive tests
9. 🔲 Set up CI/CD pipeline
10. 🔲 Add API documentation (Swagger)

## 🐛 Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check if database is running
- Ensure IP whitelist includes Render IPs

### 404 Errors
- Verify routes are properly imported in server.js
- Check route paths match documentation
- Ensure server is running

### JWT Errors
- Verify JWT_SECRET is set
- Check token format in Authorization header
- Ensure token hasn't expired

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

## 📄 License

ISC

## 👥 Support

For issues or questions, please contact support or create an issue in the repository.

---

**Built with ❤️ using Node.js, Express, and PostgreSQL**
