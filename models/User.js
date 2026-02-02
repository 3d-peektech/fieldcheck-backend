const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  role: {
    type: String,
    enum: ['admin', 'manager', 'engineer', 'technician'],
    default: 'technician'
  },
  
  department: String,
  phoneNumber: String,
  avatarUrl: String,
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  lastLoginAt: Date,
  
  // Permissions
  permissions: {
    canCreateAssets: { type: Boolean, default: false },
    canDeleteAssets: { type: Boolean, default: false },
    canManageUsers: { type: Boolean, default: false },
    canViewReports: { type: Boolean, default: true },
    canExportData: { type: Boolean, default: false }
  },
  
  // Password reset
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      company: this.company,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Set permissions based on role
userSchema.pre('save', function(next) {
  if (this.isModified('role')) {
    switch(this.role) {
      case 'admin':
        this.permissions = {
          canCreateAssets: true,
          canDeleteAssets: true,
          canManageUsers: true,
          canViewReports: true,
          canExportData: true
        };
        break;
      case 'manager':
        this.permissions = {
          canCreateAssets: true,
          canDeleteAssets: false,
          canManageUsers: false,
          canViewReports: true,
          canExportData: true
        };
        break;
      case 'engineer':
        this.permissions = {
          canCreateAssets: true,
          canDeleteAssets: false,
          canManageUsers: false,
          canViewReports: true,
          canExportData: false
        };
        break;
      case 'technician':
        this.permissions = {
          canCreateAssets: false,
          canDeleteAssets: false,
          canManageUsers: false,
          canViewReports: true,
          canExportData: false
        };
        break;
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
