const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slidesController.js');

/**
 * @swagger
 * /api/v1/slides:
 *   get:
 *     summary: Get all slides
 *     tags: [Slides]
 *     responses:
 *       200:
 *         description: Successfully retrieved slides
 *       500:
 *         description: Internal server error
 */
router.get('/', slidesController.getSlides);

/**
 * @swagger
 * /api/v1/slides/html:
 *   get:
 *     summary: Get HTML slides
 *     tags: [Slides]
 *     responses:
 *       200:
 *         description: Successfully retrieved HTML slides
 *       500:
 *         description: Internal server error
 */
router.get('/html', slidesController.getHtmlSlides);

/**
 * @swagger
 * /api/v1/slides/css:
 *   get:
 *     summary: Get CSS slides
 *     tags: [Slides]
 *     responses:
 *       200:
 *         description: Successfully retrieved CSS slides
 *       500:
 *         description: Internal server error
 */
router.get('/css', slidesController.getCssSlides);

/**
 * @swagger
 * /api/v1/slides/js:
 *   get:
 *     summary: Get JavaScript slides
 *     tags: [Slides]
 *     responses:
 *       200:
 *         description: Successfully retrieved JavaScript slides
 *       500:
 *         description: Internal server error
 */
router.get('/js', slidesController.getJsSlides);

/**
 * @swagger
 * /api/v1/slides:
 *   post:
 *     summary: Create a new slide
 *     tags: [Slides]
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
 *         description: Slide created successfully
 *       500:
 *         description: Internal server error
 */
router.post('', slidesController.postSlide);

/**
 * @swagger
 * /api/v1/slides/{slideId}:
 *   get:
 *     summary: Get a specific slide by ID
 *     tags: [Slides]
 *     parameters:
 *       - name: slideId
 *         in: path
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the slide
 *       404:
 *         description: Slide not found
 *       500:
 *         description: Internal server error
 */
router.get('/:slideId', slidesController.getSlide);

/**
 * @swagger
 * /api/v1/slides/{slideId}:
 *   delete:
 *     summary: Delete a specific slide by ID
 *     tags: [Slides]
 *     parameters:
 *       - name: slideId
 *         in: path
 *         description: ID of the slide
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slide deleted successfully
 *       404:
 *         description: Slide not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:slideId', slidesController.deleteSlide);

module.exports = router;
