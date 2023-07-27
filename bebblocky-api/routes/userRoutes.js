const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */


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
 * /user/courses:
 *   get:
 *     summary: Get user's courses
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/courses', userController.getUserCourses);

/**
 * @swagger
 * /user/courses/html:
 *   get:
 *     summary: Get user's HTML courses
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/courses/html', userController.getUserHtmlCourses);

/**
 * @swagger
 * /user/courses/css:
 *   get:
 *     summary: Get user's CSS courses
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/courses/css', userController.getUserCssCourses);

/**
 * @swagger
 * /user/courses/js:
 *   get:
 *     summary: Get user's JavaScript courses
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/courses/js', userController.getUserJsCourses);

/**
 * @swagger
 * /user/courses/{courseId}/progress:
 *   get:
 *     summary: Get user's course progress
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/courses/:courseId/progress', userController.getUserCourseProgress);

/**
 * @swagger
 * /user/courses/{courseId}/progress:
 *   post:
 *     summary: Update user course progress
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: course ID
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
 *                 description: Percentage of course completion
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.post('/courses/:courseId/progress', userController.updateUserCourseProgress);

// Define a route to get the last accessed route
router.get('/courses/last-accessed', userController.getLastAccessedCourse);

// Define a route to update the last accessed route
router.post('/courses/last-accessed', userController.updateLastAccessedCourse);

module.exports = router;
