const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!req.user.isActive) {
      return res.status(401).json({ error: 'User account is inactive' });
    }

    // Get company
    req.company = await Company.findById(req.user.company);
    
    if (!req.company) {
      return res.status(401).json({ error: 'Company not found' });
    }

    if (!req.company.isActive) {
      return res.status(401).json({ error: 'Company account is inactive' });
    }

    // Check subscription
    if (req.company.subscription.status === 'past_due') {
      return res.status(402).json({ error: 'Subscription payment required' });
    }

    next();
  } catch (error) {
    console.error('Auth Error:', error);
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

// Check specific permission
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user.permissions[permission]) {
      return res.status(403).json({
        error: `You don't have permission to ${permission.replace('can', '').toLowerCase()}`
      });
    }
    next();
  };
};

// Check usage limits
exports.checkUsageLimit = (limitType) => {
  return async (req, res, next) => {
    const company = req.company;
    
    switch(limitType) {
      case 'users':
        if (!company.canAddUser()) {
          return res.status(403).json({
            error: 'User limit reached. Please upgrade your plan.',
            current: company.usage.currentUsers,
            limit: company.limits.maxUsers
          });
        }
        break;
        
      case 'assets':
        if (!company.canAddAsset()) {
          return res.status(403).json({
            error: 'Asset limit reached. Please upgrade your plan.',
            current: company.usage.currentAssets,
            limit: company.limits.maxAssets
          });
        }
        break;
        
      case 'inspections':
        await company.resetMonthlyUsage();
        if (!company.canCreateInspection()) {
          return res.status(403).json({
            error: 'Monthly inspection limit reached. Please upgrade your plan.',
            current: company.usage.inspectionsThisMonth,
            limit: company.limits.maxInspectionsPerMonth
          });
        }
        break;
        
      case 'ai':
        if (!company.limits.aiAnalysisEnabled) {
          return res.status(403).json({
            error: 'AI analysis not available on your plan. Please upgrade.'
          });
        }
        break;
    }
    
    next();
  };
};
