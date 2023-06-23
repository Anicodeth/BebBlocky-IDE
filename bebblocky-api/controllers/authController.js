const authService = require('../services/authService');

exports.postSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const createdUser = await authService.createUser(username, email, password);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.postSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const loggedInUser = await authService.loginUser(username, password);
    res.status(201).json(loggedInUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
