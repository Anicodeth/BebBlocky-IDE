const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createUser = async (username, email, password) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('Username or email already taken');
  }

  const user = new User({ username, email, password });
  await user.save();
  return user;
};

exports.loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ userId: user._id }, 'Ananya');
  return { user, token };
};
