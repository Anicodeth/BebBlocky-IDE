const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token,process.env.SECURITYKEY || 'Ananya', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next(req, res);
  });
};
