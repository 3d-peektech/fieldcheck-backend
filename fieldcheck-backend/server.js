// server.js - Main application entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const companyRoutes = require('./routes/companies');
const assetRoutes = require('./routes/assets');
const inspectionRoutes = require('./routes/inspections');
const syncRoutes = require('./routes/sync');

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FieldCheck API Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FieldCheck Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    database: process.env.DATABASE_URL ? 'configured' : 'not configured'
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/assets', assetRoutes);
app.use('/api/v1/inspections', inspectionRoutes);
app.use('/api/v1/sync', syncRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: {
      root: '/',
      health: '/health',
      auth: '/api/v1/auth/*',
      users: '/api/v1/users/*',
      companies: '/api/v1/companies/*',
      assets: '/api/v1/assets/*',
      inspections: '/api/v1/inspections/*',
      sync: '/api/v1/sync/*'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ FieldCheck API Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
  console.log(`🚀 Server started at: ${new Date().toISOString()}`);
});

module.exports = app;
