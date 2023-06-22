const router = require('express').Router();
const usersController = require('../controllers/users.js');

// User routes
router.get('/', usersController.getUsers);
router.get('/slides', usersController.getUserSlides);
router.get('/slides/html', usersController.getUserHtmlSlides);
router.get('/slides/css', usersController.getUserCssSlides);
router.get('/slides/js', usersController.getUserJsSlides);
router.get('/slides/:slideId/progress', usersController.getUserSlideProgress);
router.post('/slides/:slideId/progress', usersController.updateUserSlideProgress);

module.exports = router;
