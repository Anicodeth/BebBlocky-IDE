const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = async (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).json({ message: 'Authorization header is missing.' });
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing.' });
  }

  jwt.verify(token, process.env.SECURITYKEY || 'Ananya', async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = await userService.getUser(decoded.userId);
    next();
  });
};
