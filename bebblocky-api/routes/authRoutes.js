const router = require('express').Router();
const authController = require('../controllers/authController.js');
const protfolioController = require('../controllers/protfolioController.js');

/**
 * @swagger
 * /auth/v1/signin:
 *   post:
 *     summary: Sign in to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/signin', authController.postSignIn);

/**
 * @swagger
 * /auth/v1/signup:
 *   post:
 *     summary: Sign up for a new account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *        description: Successfully signed up
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
router.post('/signup', authController.postSignUp);

router.post('/protfolio', protfolioController.getProtfolio);

module.exports = router;