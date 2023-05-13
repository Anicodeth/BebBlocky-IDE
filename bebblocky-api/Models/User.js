const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  progress: [{
    topic: {
      type: String,
      required: true
    },
    completedPercent: {
      type: number,
      required: true,
      default: 0
    }
  }]
});

module.exports = mongoose.model('User', userSchema);