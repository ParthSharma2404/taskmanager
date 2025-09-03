require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

console.log('Environment variables:', process.env.NODE_ENV);
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
console.log('MONGODB_URI loaded:', !!process.env.MONGODB_URI);

// Essential middleware
app.use(express.json()); // This was missing!
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://taskflow-kappa.vercel.app", // Add your actual Vercel URL here
    "http://localhost:3000"
  ],
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is working!' });
});

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// For Vercel, we need to export the app
module.exports = app;

// For local development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}