const express = require('express');
const mongoose = require('./database');
const cors = require('cors'); // Ensure cors is required after express
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express(); // Initialize the express app
app.use(cors()); // Use CORS middleware for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 5000; // Use the environment variable or default to 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
