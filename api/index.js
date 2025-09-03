require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

console.log('JWT_SECRET loaded:', process.env.JWT_SECRET); // Debug to confirm secret

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' })); // Dynamic CORS

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://loger:user123@cluster0.kv26f.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the app for Vercel
module.exports = app;