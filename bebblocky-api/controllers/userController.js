const userService = require('../services/userService');
const authenticateJWT = require('../middlewares/authMiddleware');

function getUserSlidesByType(req, res, category) {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const userSlides = await userService.getUserSlides(userId, category);
        res.status(200).json({ slides: userSlides });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getUser = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const user = await userService.getUser(userId);
        res.json({ user });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserSlides = async (req, res) => {
  getUserSlidesByType(req, res);
};

exports.getUserHtmlSlides = async (req, res) => {
  getUserSlidesByType(req, res, 'html');
};

exports.getUserCssSlides = async (req, res) => {
  getUserSlidesByType(req, res, 'css');
};

exports.getUserJsSlides = async (req, res) => {
  getUserSlidesByType(req, res, 'js');
};

exports.getUserSlideProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const slideId = req.params.slideId;
        const userId = req.user.userId;
        const progress = await userService.getUserSlideProgress(userId, slideId);
        res.status(200).json({ progress });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserSlideProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const slideId = req.params.slideId;
        const { completedPercent } = req.body;
        const message = await userService.updateUserSlideProgress(userId, slideId, completedPercent);
        res.status(201).json({ message });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateLastAccessedSlide = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        console.log('here');
        const userId = req.user.userId;
        const { slideId } = req.body;
        console.log(slideId);
        const message = await userService.updateLastAccessedSlide(userId, slideId);
        res.status(201).json({ message });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getLastAccessedSlide = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const lastAccessedSlideId = await userService.getLastAccessedSlide(userId);
        res.status(201).json({ lastAccessedSlideId });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
