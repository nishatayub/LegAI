const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register a new user (local)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return errorResponse(res, 'Please provide all required fields', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User already exists with this email', 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
        token,
      },
      'User registered successfully',
      201
    );
  } catch (error) {
    console.error('Register error:', error);
    return errorResponse(res, error.message, 500);
  }
};

// @desc    Login user (local)
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(res, 'Please provide email and password', 400);
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }


    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Generate token
    const token = generateToken(user._id);

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
        token,
      },
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, error.message, 500);
  }
};


// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
        },
      },
      'User retrieved successfully'
    );
  } catch (error) {
    console.error('Get me error:', error);
    return errorResponse(res, error.message, 500);
  }
};

// @desc    Logout user (invalidate token on client side)
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // In a stateless JWT setup, logout is handled client-side by removing the token
    // You could implement a token blacklist here if needed
    return successResponse(res, null, 'Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    return errorResponse(res, error.message, 500);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      },
      'Profile updated successfully'
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return errorResponse(res, error.message, 500);
  }
};
