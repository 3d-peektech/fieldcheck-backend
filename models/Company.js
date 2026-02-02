const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  industry: String,
  address: String,
  phone: String,
  
  // Subscription
  subscription: {
    plan: {
      type: String,
      enum: ['trial', 'basic', 'professional', 'enterprise'],
      default: 'trial'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'past_due', 'trialing'],
      default: 'trialing'
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodEnd: Date,
    trialEndsAt: Date
  },
  
  // Limits based on plan
  limits: {
    maxUsers: { type: Number, default: 5 },
    maxAssets: { type: Number, default: 50 },
    maxInspectionsPerMonth: { type: Number, default: 100 },
    aiAnalysisEnabled: { type: Boolean, default: true }
  },
  
  // Usage tracking
  usage: {
    currentUsers: { type: Number, default: 0 },
    currentAssets: { type: Number, default: 0 },
    inspectionsThisMonth: { type: Number, default: 0 },
    lastResetDate: { type: Date, default: Date.now }
  },
  
  // Settings
  settings: {
    logoUrl: String,
    primaryColor: { type: String, default: '#1976D2' },
    timezone: { type: String, default: 'UTC' },
    language: { type: String, default: 'en' }
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Methods
companySchema.methods.canAddUser = function() {
  return this.usage.currentUsers < this.limits.maxUsers;
};

companySchema.methods.canAddAsset = function() {
  return this.usage.currentAssets < this.limits.maxAssets;
};

companySchema.methods.canCreateInspection = function() {
  return this.usage.inspectionsThisMonth < this.limits.maxInspectionsPerMonth;
};

companySchema.methods.resetMonthlyUsage = function() {
  const now = new Date();
  const lastReset = new Date(this.usage.lastResetDate);
  
  if (now.getMonth() !== lastReset.getMonth()) {
    this.usage.inspectionsThisMonth = 0;
    this.usage.lastResetDate = now;
    return this.save();
  }
};

module.exports = mongoose.model('Company', companySchema);
