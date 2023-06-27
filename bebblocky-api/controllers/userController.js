const userService = require('../services/userService');
const authenticateJWT = require('../middlewares/authMiddleware');

function getUsercoursesByType(req, res, category) {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const usercourses = await userService.getUsercourses(userId, category);
        res.status(200).json({ courses: usercourses });
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

exports.getUsercourses = async (req, res) => {
  getUsercoursesByType(req, res);
};

exports.getUserHtmlcourses = async (req, res) => {
  getUsercoursesByType(req, res, 'html');
};

exports.getUserCsscourses = async (req, res) => {
  getUsercoursesByType(req, res, 'css');
};

exports.getUserJscourses = async (req, res) => {
  getUsercoursesByType(req, res, 'js');
};

exports.getUsercourseProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const courseId = req.params.courseId;
        const userId = req.user.userId;
        const progress = await userService.getUsercourseProgress(userId, courseId);
        res.status(200).json({ progress });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUsercourseProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const courseId = req.params.courseId;
        const { completedPercent } = req.body;
        const message = await userService.updateUsercourseProgress(userId, courseId, completedPercent);
        res.status(201).json({ message });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateLastAccessedcourse = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        console.log('here');
        const userId = req.user.userId;
        const { courseId } = req.body;
        console.log(courseId);
        const message = await userService.updateLastAccessedcourse(userId, courseId);
        res.status(201).json({ message });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getLastAccessedcourse = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const lastAccessedcourseId = await userService.getLastAccessedcourse(userId);
        res.status(201).json({ lastAccessedcourseId });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
