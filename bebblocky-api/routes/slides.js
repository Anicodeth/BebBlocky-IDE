const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slides.js');

router.get('/', slidesController.getSlides);
router.get('/html', slidesController.getHtmlSlides);
router.get('/css', slidesController.getCssSlides);
router.get('/js', slidesController.getJsSlides);
router.post('', slidesController.postSlide);
router.get('/:slideId', slidesController.getSlide);
router.delete('/:slideId', slidesController.deleteSlide);

module.exports = router;
