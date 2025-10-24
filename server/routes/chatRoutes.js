const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createChat,
  getChats,
  getChat,
  sendMessage,
  deleteChat,
  renameChat,
  getChatMessages
} = require('../controllers/chatController');

const router = express.Router();

// All routes are protected
router.use(protect);

// Chat routes
router.route('/')
  .post(createChat)           // Create a new chat
  .get(getChats);             // Get all chats for the user

router.route('/:chatId')
  .get(getChat)               // Get a specific chat
  .put(renameChat)            // Rename a chat
  .delete(deleteChat);        // Delete a chat

router.route('/:chatId/messages')
  .get(getChatMessages)       // Get messages from a specific chat
  .post(sendMessage);         // Send a message to a specific chat

module.exports = router;