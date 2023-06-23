const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.postSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already taken' });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.postSignIn = async (req, res) => {
  console.log('here');
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'Ananya');

    console.log(token);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
