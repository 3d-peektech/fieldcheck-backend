const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  assetId: {
    type: String,
    required: true,
    unique: true
  },
  
  type: {
    type: String,
    enum: ['pump', 'motor', 'conveyor', 'boiler', 'compressor', 'generator', 'valve', 'tank', 'hvac', 'other'],
    required: true
  },
  
  manufacturer: String,
  model: String,
  serialNumber: String,
  
  location: {
    building: String,
    floor: String,
    room: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  specifications: {
    power: String,
    capacity: String,
    voltage: String,
    frequency: String,
    custom: mongoose.Schema.Types.Mixed
  },
  
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive', 'decommissioned'],
    default: 'active'
  },
  
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'critical'],
    default: 'good'
  },
  
  criticality: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  
  installDate: Date,
  warrantyExpires: Date,
  lastMaintenanceDate: Date,
  nextMaintenanceDate: Date,
  
  images: [{
    url: String,
    uploadedAt: Date,
    description: String
  }],
  
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: Date
  }],
  
  qrCode: String,
  barcode: String,
  
  // Inspection statistics
  stats: {
    totalInspections: { type: Number, default: 0 },
    lastInspectionDate: Date,
    averageScore: Number,
    issuesFound: { type: Number, default: 0 },
    criticalIssues: { type: Number, default: 0 }
  },
  
  notes: String,
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
assetSchema.index({ company: 1, status: 1 });
assetSchema.index({ company: 1, type: 1 });
assetSchema.index({ company: 1, assetId: 1 }, { unique: true });

// Auto-generate assetId if not provided
assetSchema.pre('save', async function(next) {
  if (!this.assetId) {
    const count = await this.constructor.countDocuments({ company: this.company });
    this.assetId = `${this.type.toUpperCase()}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Asset', assetSchema);
