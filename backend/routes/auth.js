const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { walletAddress, name, role, email } = req.body;

    // Validate required fields
    if (!walletAddress || !name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address, name, and role are required'
      });
    }

    // Validate role
    if (!['student', 'tutor'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be either "student" or "tutor"'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this wallet address already exists'
      });
    }

    // Create new user
    const user = new User({
      walletAddress: walletAddress.toLowerCase(),
      name: name.trim(),
      role,
      email: email ? email.toLowerCase().trim() : undefined
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user by wallet address
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address is required'
      });
    }

    // Find user by wallet address
    const user = await User.findOne({ 
      walletAddress: walletAddress.toLowerCase(),
      isActive: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or account inactive'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/auth/user/:walletAddress
// @desc    Get user profile by wallet address
// @access  Public
router.get('/user/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const user = await User.findOne({ 
      walletAddress: walletAddress.toLowerCase(),
      isActive: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   PUT /api/auth/user/:walletAddress
// @desc    Update user profile
// @access  Public (wallet-based auth)
router.put('/user/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { name, email, bio, subjects } = req.body;

    const user = await User.findOne({ 
      walletAddress: walletAddress.toLowerCase(),
      isActive: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update allowed fields
    if (name) user.name = name.trim();
    if (email) user.email = email.toLowerCase().trim();
    if (bio !== undefined) user.bio = bio;
    if (subjects) user.subjects = subjects;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
