const authService = require('../services/authService');
const sendVerificationEmail = require('../utils/email.js');
const asyncWrapper = require('../utils/controllerAsyncWrapper');

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

exports.postSignUp = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const { username, email, password } = req.body;
    const user = await authService.createUser(username, email, password);
    res.status(201).json(user);
  }, next);
};

exports.postSignUpWithVerification  = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const { username, email, password } = req.body;
    const verificationCode = generateRandomCode();
    const user = await authService.createUserWithVerification(username, email, password, verificationCode);

    await sendVerificationEmail(email, verificationCode);
    res.status(201).json({ message: 'User created successfully. Please check your email for verification.' });
  }, next);
};

exports.postSignIn = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const { username, password } = req.body;
    const { user, token } = await authService.loginUser(username, password);
    res.status(201).json({ user, token });
  }, next);
};


exports.verifyToken = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const code = req.params.code;
    const userDetails = await authService.verifyUser(code);
    const { user, token } = await authService.loginUser(userDetails.username, userDetails.password);
    res.status(201).json({ user, token });
  });
}