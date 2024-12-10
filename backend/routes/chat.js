const express = require('express');
const Chat = require('../models/chat');
const router = express.Router();
const { verifyToken } = require('../utils/auth');

// Get chat history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.userId });
    res.json(chat || { messages: [] });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving chat history' });
  }
});

// Save a new chat message
router.post('/message', verifyToken, async (req, res) => {
  const { role, content } = req.body;
  try {
    let chat = await Chat.findOne({ userId: req.userId });
    if (!chat) {
      chat = new Chat({ userId: req.userId, messages: [] });
    }
    chat.messages.push({ role, content });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Error saving chat message' });
  }
});

module.exports = router;
