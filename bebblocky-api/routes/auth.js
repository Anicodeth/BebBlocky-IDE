const router = require('express').Router();
const authController = require('../controllers/auth.js');

router.post('/signin', authController.postSignIn);
router.post('/signup', authController.postSignUp);

module.exports = router;
