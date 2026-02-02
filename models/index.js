// server.js or index.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROOT ROUTE - Add this FIRST
app.get('/', (req, res) => {
  res.json({
    message: 'FieldCheck API Server',
    version: '1.0.0',
    status: 'running',
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

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FieldCheck Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes (if you have them)
// app.use('/api/v1', apiRoutes);

// 404 Handler - Add this LAST
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: ['/', '/health', '/api/v1/*']
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});