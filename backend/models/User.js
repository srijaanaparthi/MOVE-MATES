const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'tutor'],
    default: 'student'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    sparse: true // Allows multiple users without email
  },
  profileImage: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  subjects: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ walletAddress: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this.name || `User_${this.walletAddress.slice(0, 8)}`;
});

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  return {
    walletAddress: this.walletAddress,
    name: this.name,
    role: this.role,
    profileImage: this.profileImage,
    bio: this.bio,
    subjects: this.subjects,
    rating: this.rating,
    totalSessions: this.totalSessions,
    isActive: this.isActive,
    createdAt: this.createdAt
  };
};

// Pre-save middleware
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
