const { OpenAI } = require("openai");
const Chat = require('../models/Chat');
const dotenv = require('dotenv');

dotenv.config();

// Initialize OpenAI client with Groq configuration
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

// Check if API key is available
if (!process.env.GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not set in environment variables');
}

const getGroqResponse = async (req, res) => {
    try {
        const { message, chatId } = req.body;
        const userId = req.user._id; // This comes from the auth middleware

        if (!message) {
            return res.status(400).json({ 
                success: false, 
                message: "Message is required" 
            });
        }

        if (!chatId) {
            return res.status(400).json({ 
                success: false, 
                message: "Chat ID is required" 
            });
        }

        // Get the chat to include conversation history for context
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ 
                success: false, 
                message: "Chat not found" 
            });
        }

        // Prepare messages for the AI model (including conversation history for context)
        const conversationHistory = chat.messages.map(msg => ({
            role: msg.senderType === 'user' ? 'user' : 'assistant',
            content: msg.text
        }));

        // Add the new user message
        conversationHistory.push({
            role: 'user',
            content: message
        });

        // Call Groq API
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b", // Using a valid Groq model
            messages: conversationHistory,
            temperature: 0.3,
            max_tokens: 1024,
            top_p: 1,
            stream: false // Not using streaming for simplicity
        });

        const aiResponse = response.choices[0]?.message?.content?.trim() || "I couldn't process that request. Please try again.";

        res.status(200).json({
            success: true,
            response: aiResponse
        });

    } catch (error) {
        console.error('Error calling Groq API:', error.message || error);
        res.status(500).json({
            success: false,
            message: error.message || "Error processing your request with AI service"
        });
    }
};

module.exports = {
    getGroqResponse
};