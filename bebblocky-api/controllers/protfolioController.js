const asyncWrapper = require('../utils/controllerAsyncWrapper');


exports.getProtfolio = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const user = await userService.getUser(userId);
        res.json({ user });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  }, next);
};
