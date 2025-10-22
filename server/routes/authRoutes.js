const express = require('express');
const {
  register,
  login,
  googleAuth,
  getMe,
  logout,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);

// Protected routes (require authentication)
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/profile', protect, updateProfile);

module.exports = router;
