const router = require('express').Router();
const userController = require('../controllers/userController.js');

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get user's details
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *       500:
 *         description: Internal server error
 */
router.get('/', userController.getUser);

/**
 * @swagger
 * /api/v1/user/slides:
 *   get:
 *     summary: Get user's slides
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user slides
 *       500:
 *         description: Internal server error
 */
router.get('/slides', userController.getUserSlides);

/**
 * @swagger
 * /api/v1/user/slides/html:
 *   get:
 *     summary: Get user's HTML slides
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user HTML slides
 *       500:
 *         description: Internal server error
 */
router.get('/slides/html', userController.getUserHtmlSlides);

/**
 * @swagger
 * /api/v1/user/slides/css:
 *   get:
 *     summary: Get user's CSS slides
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user CSS slides
 *       500:
 *         description: Internal server error
 */
router.get('/slides/css', userController.getUserCssSlides);

/**
 * @swagger
 * /api/v1/user/slides/js:
 *   get:
 *     summary: Get user's JavaScript slides
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user JavaScript slides
 *       500:
 *         description: Internal server error
 */
router.get('/slides/js', userController.getUserJsSlides);

/**
 * @swagger
 * /api/v1/user/slides/{slideId}/progress:
 *   get:
 *     summary: Get user's slide progress by slide ID
 *     tags: [User]
 *     parameters:
 *       - name: slideId
 *         in: path
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user slide progress
 *       500:
 *         description: Internal server error
 */
router.get('/slides/:slideId/progress', userController.getUserSlideProgress);

/**
 * @swagger
 * /api/v1/user/slides/{slideId}/progress:
 *   post:
 *     summary: Update user slide progress by slide ID
 *     tags: [User]
 *     parameters:
 *       - name: slideId
 *         in: path
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completedPercent:
 *                 type: number
 *             required:
 *               - completedPercent
 *     responses:
 *       200:
 *         description: User slide progress updated successfully
 *       500:
 *         description: Internal server error
 */
router.post('/slides/:slideId/progress', userController.updateUserSlideProgress);

module.exports = router;
