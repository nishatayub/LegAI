const express = require('express');
const { getGroqResponse } = require('../controllers/groqController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/groq - Get response from Groq AI
router.post('/', protect, getGroqResponse);

module.exports = router;