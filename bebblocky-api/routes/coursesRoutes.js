const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successfully retrieved courses
 *       500:
 *         description: Internal server error
 */
router.get('/', coursesController.getCourses);

/**
 * @swagger
 * /api/v1/courses/html:
 *   get:
 *     summary: Get HTML courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successfully retrieved HTML courses
 *       500:
 *         description: Internal server error
 */
router.get('/html', coursesController.getHtmlCourses);

/**
 * @swagger
 * /api/v1/courses/css:
 *   get:
 *     summary: Get CSS courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successfully retrieved CSS courses
 *       500:
 *         description: Internal server error
 */
router.get('/css', coursesController.getCssCourses);

/**
 * @swagger
 * /api/v1/courses/js:
 *   get:
 *     summary: Get JavaScript courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successfully retrieved JavaScript courses
 *       500:
 *         description: Internal server error
 */
router.get('/js', coursesController.getJsCourses);

/**
 * @swagger
 * /api/v1/courses/{courseId}:
 *   get:
 *     summary: Get a specific course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: ID of the course
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the course
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.get('/:courseId', coursesController.getCourse);

// Use auth middleware for the following routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/v1/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the request body here
 *     responses:
 *       200:
 *         description: Course created successfully
 *       500:
 *         description: Internal server error
 */
router.post('', coursesController.addCourse);

/**
 * @swagger
 * /api/v1/courses/{courseId}:
 *   delete:
 *     summary: Delete a specific course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: ID of the course
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:courseId', coursesController.deleteCourse);


/**
 * @swagger
 * /api/v1/courses/{courseId}:
 *   delete:
 *     summary: Update a specific course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: ID of the course
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
 *               // Define properties for the request body here
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.put('/:courseId', coursesController.updateCourse);

module.exports = router;
