const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inputText: String,
  description: String,
  hashtags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Prompt', promptSchema);
