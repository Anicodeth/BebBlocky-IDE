const authService = require('../services/authService');

async function asyncWrapper(req, res, callback, next) {
  try {
    return await callback(req, res);
  } catch (error) {
    next(error);
  }
}

exports.postSignUp = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const { username, email, password } = req.body;
    console.log('creating a new user: controller', username, email, password);
    const user = await authService.createUser(username, email, password);
    res.status(201).json(user);
  }, next);
};

exports.postSignIn = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const { username, password } = req.body;
    const { user, token } = await authService.loginUser(username, password);
    res.status(201).json({ user, token });
  }, next);
};