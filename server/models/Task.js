const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // Fixed: removed enum, kept as free text
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  category: { type: String },
  dueDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;