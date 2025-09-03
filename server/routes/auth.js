const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');
const router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

router.post('/register', async (req, res) => {
  console.log('Register attempt:', req.body);
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    console.log('User registered:', email, 'User saved:', user);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful:', email);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('fullName email');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/tasks', authenticateToken, async (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;
    if (!title) throw new Error('Title is required');
    const task = new Task({
      title,
      description,
      priority,
      category,
      dueDate,
      userId: req.userId
    });
    await task.save();
    console.log('Task created:', task);
    res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    console.error('Task creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    console.error('Task fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.patch('/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.userId },
      { completed },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    console.log('Task updated:', task);
    res.json({ message: 'Task updated', task });
  } catch (err) {
    console.error('Task update error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;