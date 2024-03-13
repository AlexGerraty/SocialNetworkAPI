const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThoughtSchema = new Schema({
  thoughtText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [
    {
      reactionBody: { type: String, required: true },
      username: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Thought', ThoughtSchema);