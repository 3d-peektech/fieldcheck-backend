# FieldCheck Backend API

Backend API for FieldCheck - Field Inspection Management System

## 🚀 Features

- RESTful API architecture
- JWT authentication
- PostgreSQL database with Sequelize ORM
- Express.js framework
- Security with Helmet and CORS
- Request logging with Morgan
- Stripe payment integration ready

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database
- npm >= 9.0.0

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/3d-peektech/fieldcheck-backend.git
cd fieldcheck-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
NODE_ENV=development
PORT=10000
DATABASE_URL=postgresql://user:password@localhost:5432/fieldcheck
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_key
CORS_ORIGIN=http://localhost:3000
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Health check endpoint

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users` - Get all users (Admin)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin)

### Companies
- `GET /api/v1/companies` - Get all companies
- `POST /api/v1/companies` - Create company
- `GET /api/v1/companies/:id` - Get company by ID
- `PUT /api/v1/companies/:id` - Update company
- `DELETE /api/v1/companies/:id` - Delete company

### Assets
- `GET /api/v1/assets` - Get all assets
- `POST /api/v1/assets` - Create asset
- `GET /api/v1/assets/:id` - Get asset by ID
- `PUT /api/v1/assets/:id` - Update asset
- `DELETE /api/v1/assets/:id` - Delete asset

### Inspections
- `GET /api/v1/inspections` - Get all inspections
- `POST /api/v1/inspections` - Create inspection
- `GET /api/v1/inspections/:id` - Get inspection by ID
- `PUT /api/v1/inspections/:id` - Update inspection
- `DELETE /api/v1/inspections/:id` - Delete inspection

### Sync
- `POST /api/v1/sync/upload` - Upload offline data
- `GET /api/v1/sync/download` - Download data for offline use
- `POST /api/v1/sync/resolve-conflicts` - Resolve sync conflicts
- `GET /api/v1/sync/status` - Get sync status

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (development/production) | Yes |
| PORT | Server port | Yes |
| DATABASE_URL | PostgreSQL connection string | Yes |
| JWT_SECRET | Secret for JWT tokens | Yes |
| JWT_EXPIRE | JWT expiration time | No |
| STRIPE_SECRET_KEY | Stripe secret key | No |
| STRIPE_WEBHOOK_SECRET | Stripe webhook secret | No |
| CORS_ORIGIN | Allowed CORS origin | No |

## 🏗️ Project Structure

```
fieldcheck-backend/
├── config/
│   └── database.js         # Database configuration
├── routes/
│   ├── auth.routes.js      # Authentication routes
│   ├── user.routes.js      # User routes
│   ├── company.routes.js   # Company routes
│   ├── asset.routes.js     # Asset routes
│   ├── inspection.routes.js # Inspection routes
│   └── sync.routes.js      # Sync routes
├── server.js               # Main application entry point
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md              # This file
```

## 🚢 Deployment

### Render.com

1. Create a new Web Service
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy!

Build Command: `npm install`
Start Command: `npm start`

### Required Environment Variables on Render:
- NODE_ENV=production
- PORT=10000
- DATABASE_URL=[Your PostgreSQL Internal URL]
- JWT_SECRET=[Your secret key]

## 🧪 Testing

```bash
npm test
```

## 📝 License

ISC

## 👥 Author

3D Peektech Team

## 🔗 Links

- [Render Dashboard](https://dashboard.render.com)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [GitHub Repository](https://github.com/3d-peektech/fieldcheck-backend)
