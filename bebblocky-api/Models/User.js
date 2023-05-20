const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  progress: [{
    slideId: {
      type: Number,
      required: true
    },
    completedPercent: {
      type: Number,
      required: true,
      default: 0
    }
  }]
});



const User = mongoose.model('User', userSchema);

module.exports = { User };