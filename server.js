require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'FieldCheck Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FieldCheck API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      companies: '/api/v1/companies',
      assets: '/api/v1/assets',
      inspections: '/api/v1/inspections',
      sync: '/api/v1/sync'
    }
  });
});

// Import and use routes only if they exist and are properly exported
try {
  const authRoutes = require('./routes/auth.routes');
  if (authRoutes && typeof authRoutes === 'function') {
    app.use('/api/v1/auth', authRoutes);
    console.log('✅ Auth routes loaded');
  }
} catch (error) {
  console.log('⚠️ Auth routes not loaded:', error.message);
}

try {
  const userRoutes = require('./routes/user.routes');
  if (userRoutes && typeof userRoutes === 'function') {
    app.use('/api/v1/users', userRoutes);
    console.log('✅ User routes loaded');
  }
} catch (error) {
  console.log('⚠️ User routes not loaded:', error.message);
}

try {
  const companyRoutes = require('./routes/company.routes');
  if (companyRoutes && typeof companyRoutes === 'function') {
    app.use('/api/v1/companies', companyRoutes);
    console.log('✅ Company routes loaded');
  }
} catch (error) {
  console.log('⚠️ Company routes not loaded:', error.message);
}

try {
  const assetRoutes = require('./routes/asset.routes');
  if (assetRoutes && typeof assetRoutes === 'function') {
    app.use('/api/v1/assets', assetRoutes);
    console.log('✅ Asset routes loaded');
  }
} catch (error) {
  console.log('⚠️ Asset routes not loaded:', error.message);
}

try {
  const inspectionRoutes = require('./routes/inspection.routes');
  if (inspectionRoutes && typeof inspectionRoutes === 'function') {
    app.use('/api/v1/inspections', inspectionRoutes);
    console.log('✅ Inspection routes loaded');
  }
} catch (error) {
  console.log('⚠️ Inspection routes not loaded:', error.message);
}

try {
  const syncRoutes = require('./routes/sync.routes');
  if (syncRoutes && typeof syncRoutes === 'function') {
    app.use('/api/v1/sync', syncRoutes);
    console.log('✅ Sync routes loaded');
  }
} catch (error) {
  console.log('⚠️ Sync routes not loaded:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found',
      status: 404,
      path: req.path
    }
  });
});

const PORT = process.env.PORT || 10000;

// Database connection and server start
const startServer = async () => {
  try {
    // Only connect to database if DATABASE_URL is provided
    if (process.env.DATABASE_URL) {
      const { sequelize } = require('./config/database');
      await sequelize.authenticate();
      console.log('✅ Database connection established successfully.');
      
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synchronized.');
    } else {
      console.log('⚠️ DATABASE_URL not set. Running without database connection.');
    }
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 FieldCheck Backend Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
