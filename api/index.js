require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

console.log('Environment variables:', process.env); // Debug all env vars
console.log('JWT_SECRET loaded:', process.env.JWT_SECRET);

app.use(cors({ origin: process.env.FRONTEND_URL || 'https://taskmanager.vercel.app' }));
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;