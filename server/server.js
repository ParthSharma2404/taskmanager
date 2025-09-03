require('dotenv').config({ path: __dirname + '/.env' }); // Explicitly specify .env path
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

console.log('JWT_SECRET loaded:', process.env.JWT_SECRET); // Debug to confirm secret

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://loger:user123@cluster0.kv26f.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));