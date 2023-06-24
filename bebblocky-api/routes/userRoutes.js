/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

const router = require('express').Router();
const userController = require('../controllers/userController.js');

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user's information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/', userController.getUser);

/**
 * @swagger
 * /user/slides:
 *   get:
 *     summary: Get user's slides
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/slides', userController.getUserSlides);

/**
 * @swagger
 * /user/slides/html:
 *   get:
 *     summary: Get user's HTML slides
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/slides/html', userController.getUserHtmlSlides);

/**
 * @swagger
 * /user/slides/css:
 *   get:
 *     summary: Get user's CSS slides
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/slides/css', userController.getUserCssSlides);

/**
 * @swagger
 * /user/slides/js:
 *   get:
 *     summary: Get user's JavaScript slides
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/slides/js', userController.getUserJsSlides);

/**
 * @swagger
 * /user/slides/{slideId}/progress:
 *   get:
 *     summary: Get user's slide progress
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slideId
 *         required: true
 *         description: Slide ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/slides/:slideId/progress', userController.getUserSlideProgress);

/**
 * @swagger
 * /user/slides/{slideId}/progress:
 *   post:
 *     summary: Update user slide progress
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slideId
 *         required: true
 *         description: Slide ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               completedPercent:
 *                 type: number
 *                 description: Percentage of slide completion
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.post('/slides/:slideId/progress', userController.updateUserSlideProgress);

// Define a route to get the last accessed route
router.get('slides/last-accessed', userController.getLastAccessedSlide);

// Define a route to update the last accessed route
router.post('slides/last-accessed', userController.updateLastAccessedSlide);

module.exports = router;
