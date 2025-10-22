const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      authProvider: 'local',
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
          authProvider: user.authProvider,
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

    // Check if user registered with Google
    if (user.authProvider === 'google') {
      return errorResponse(
        res,
        'This account uses Google sign-in. Please use Google to login',
        400
      );
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
          authProvider: user.authProvider,
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

// @desc    Google OAuth login
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return errorResponse(res, 'Google credential is required', 400);
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists - update Google info if needed
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        user.avatar = picture || user.avatar;
        user.isEmailVerified = true;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
        authProvider: 'google',
        isEmailVerified: true,
      });
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
          authProvider: user.authProvider,
        },
        token,
      },
      'Google authentication successful'
    );
  } catch (error) {
    console.error('Google auth error:', error);
    return errorResponse(res, 'Google authentication failed', 500);
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
          authProvider: user.authProvider,
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
          authProvider: user.authProvider,
        },
      },
      'Profile updated successfully'
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return errorResponse(res, error.message, 500);
  }
};
