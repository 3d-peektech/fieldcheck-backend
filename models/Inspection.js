const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  inspectionId: {
    type: String,
    required: true,
    unique: true
  },
  
  type: {
    type: String,
    enum: ['routine', 'maintenance', 'emergency', 'preventive', 'predictive'],
    default: 'routine'
  },
  
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'reviewed', 'archived'],
    default: 'in_progress'
  },
  
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'critical'],
    default: 'normal'
  },
  
  scheduledDate: Date,
  completedDate: Date,
  
  // Inspection data
  findings: {
    summary: String,
    issues: [{
      title: String,
      description: String,
      severity: {
        type: String,
        enum: ['minor', 'moderate', 'major', 'critical']
      },
      location: String,
      recommendedAction: String
    }]
  },
  
  // Photos
  photos: [{
    url: String,
    thumbnail: String,
    uploadedAt: Date,
    caption: String,
    metadata: {
      size: Number,
      mimeType: String,
      width: Number,
      height: Number
    }
  }],
  
  // AI Analysis
  aiAnalysis: {
    analyzed: { type: Boolean, default: false },
    analyzedAt: Date,
    model: String,
    confidence: Number,
    
    detectedIssues: [{
      type: String,
      description: String,
      severity: String,
      confidence: Number,
      location: {
        x: Number,
        y: Number,
        width: Number,
        height: Number
      }
    }],
    
    overallCondition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'critical']
    },
    
    recommendations: [String],
    
    predictedFailureRisk: {
      level: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical']
      },
      timeframe: String,
      confidence: Number
    },
    
    estimatedMaintenanceCost: Number,
    
    rawResponse: mongoose.Schema.Types.Mixed
  },
  
  // Inspector notes
  notes: String,
  internalNotes: String,
  
  // Measurements
  measurements: [{
    parameter: String,
    value: Number,
    unit: String,
    threshold: {
      min: Number,
      max: Number
    },
    withinRange: Boolean
  }],
  
  // Location
  location: {
    latitude: Number,
    longitude: Number
  },
  
  // Duration
  duration: Number, // in minutes
  
  // Signatures
  inspectorSignature: String,
  supervisorSignature: String,
  signedAt: Date,
  
  // Review
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  reviewNotes: String,
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
inspectionSchema.index({ company: 1, asset: 1 });
inspectionSchema.index({ company: 1, status: 1 });
inspectionSchema.index({ company: 1, createdAt: -1 });

// Auto-generate inspectionId
inspectionSchema.pre('save', async function(next) {
  if (!this.inspectionId) {
    const count = await this.constructor.countDocuments({ company: this.company });
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    this.inspectionId = `INS-${year}${month}-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Calculate duration if not set
inspectionSchema.pre('save', function(next) {
  if (this.status === 'completed' && this.completedDate && !this.duration) {
    this.duration = Math.round((this.completedDate - this.createdAt) / 60000); // minutes
  }
  next();
});

module.exports = mongoose.model('Inspection', inspectionSchema);
