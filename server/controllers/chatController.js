const Chat = require('../models/Chat');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// Create a new chat
exports.createChat = async (req, res) => {
  try {
    const { name, participants } = req.body;
    
    // Create a new chat with the authenticated user as the first participant
    const chat = new Chat({
      name: name || `Chat ${new Date().toLocaleDateString()}`,
      participants: [req.user._id, ...(participants || [])]
    });
    
    await chat.save();
    
    // Populate the participants for the response
    await chat.populate('participants', 'name email');
    
    return successResponse(res, chat, 'Chat created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Get all chats for the authenticated user
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id
    })
    .populate('participants', 'name email')
    .sort({ updatedAt: -1 });

    return successResponse(res, chats, 'Chats retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Get a specific chat by ID
exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      participants: req.user._id
    })
    .populate('participants', 'name email')
    .populate('messages.sender', 'name email');

    if (!chat) {
      return errorResponse(res, 'Chat not found', 404);
    }

    return successResponse(res, chat, 'Chat retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Send a message to a chat
exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text, senderType } = req.body;

    // Find the chat and ensure the user is a participant
    const chat = await Chat.findOne({
      _id: chatId,
      participants: req.user._id
    });

    if (!chat) {
      return errorResponse(res, 'Chat not found or access denied', 404);
    }

    // Add the message to the chat
    const message = {
      text,
      senderType: senderType || 'user'
    };

    // Only add sender field for user messages
    if (senderType === 'user' || !senderType) {
      message.sender = req.user._id;
    }

    chat.messages.push(message);
    chat.updatedAt = Date.now();
    await chat.save();

    // Populate the sender information for the response
    await chat.populate({
      path: 'messages.sender',
      select: 'name email'
    });

    // Get the newly added message
    const newMessage = chat.messages[chat.messages.length - 1];

    return successResponse(res, newMessage, 'Message sent successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Delete a chat
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: req.user._id
    });

    if (!chat) {
      return errorResponse(res, 'Chat not found or access denied', 404);
    }

    await Chat.findByIdAndDelete(chatId);

    return successResponse(res, null, 'Chat deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Rename a chat
exports.renameChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { name } = req.body;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: req.user._id
    });

    if (!chat) {
      return errorResponse(res, 'Chat not found or access denied', 404);
    }

    chat.name = name;
    chat.updatedAt = Date.now();
    await chat.save();

    return successResponse(res, chat, 'Chat renamed successfully');
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Get chat messages
exports.getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: req.user._id
    }).populate('messages.sender', 'name email');

    if (!chat) {
      return errorResponse(res, 'Chat not found or access denied', 404);
    }

    return successResponse(res, chat.messages, 'Messages retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};