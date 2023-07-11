const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

exports.postSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await authService.checkExistingUser(username, email);
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already taken' });
    }
    const user = await authService.createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.postSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.getUserByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'Ananya' );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};