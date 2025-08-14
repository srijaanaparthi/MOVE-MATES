const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @route   GET /api/users/tutors
// @desc    Get all active tutors
// @access  Public
router.get('/tutors', async (req, res) => {
  try {
    const { page = 1, limit = 20, subject, rating } = req.query;

    // Build filter
    const filter = {
      role: 'tutor',
      isActive: true
    };

    if (subject) {
      filter.subjects = { $regex: subject, $options: 'i' };
    }

    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    // Build sort
    const sort = { rating: -1, totalSessions: -1, createdAt: -1 };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const tutors = await User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .select('walletAddress name profileImage bio subjects rating totalSessions createdAt');

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        tutors,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limitNum),
          totalTutors: total,
          hasNextPage: skip + tutors.length < total,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Get tutors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tutors',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/users/students
// @desc    Get all active students
// @access  Public
router.get('/students', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const students = await User.find({
      role: 'student',
      isActive: true
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('walletAddress name profileImage bio subjects totalSessions createdAt');

    const total = await User.countDocuments({ role: 'student', isActive: true });

    res.json({
      success: true,
      data: {
        students,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limitNum),
          totalStudents: total,
          hasNextPage: skip + students.length < total,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/users/search
// @desc    Search users by name or subjects
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, role, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    const filter = {
      isActive: true,
      $or: [
        { name: { $regex: q.trim(), $options: 'i' } },
        { subjects: { $regex: q.trim(), $options: 'i' } },
        { bio: { $regex: q.trim(), $options: 'i' } }
      ]
    };

    if (role && ['student', 'tutor'].includes(role)) {
      filter.role = role;
    }

    const users = await User.find(filter)
      .sort({ rating: -1, totalSessions: -1 })
      .limit(parseInt(limit))
      .select('walletAddress name role profileImage bio subjects rating totalSessions');

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching users',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get platform statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalTutors, totalStudents, topTutors] = await Promise.all([
      User.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'tutor', isActive: true }),
      User.countDocuments({ role: 'student', isActive: true }),
      User.find({ role: 'tutor', isActive: true })
        .sort({ rating: -1, totalSessions: -1 })
        .limit(5)
        .select('name rating totalSessions')
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTutors,
        totalStudents,
        topTutors
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
