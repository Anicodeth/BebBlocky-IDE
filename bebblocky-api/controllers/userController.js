const userService = require('../services/userService');
const authenticateJWT = require('../middlewares/authMiddleware');

function getUserCoursesByType(req, res, category) {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const userCourses = await userService.getUserCourses(userId, category);
        res.status(200).json({ courses: userCourses });
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

exports.getUserCourses = async (req, res) => {
  getUserCoursesByType(req, res);
};

exports.getUserHtmlCourses = async (req, res) => {
  getUserCoursesByType(req, res, 'html');
};

exports.getUserCssCourses = async (req, res) => {
  getUserCoursesByType(req, res, 'css');
};

exports.getUserJsCourses = async (req, res) => {
  getUserCoursesByType(req, res, 'js');
};

exports.getUserCourseProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const courseId = req.params.courseId;
        const userId = req.user.userId;
        const progress = await userService.getUserCourseProgress(userId, courseId);
        res.status(200).json({ progress });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserCourseProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const courseId = req.params.courseId;
        const { completedPercent } = req.body;
        const message = await userService.updateUserCourseProgress(userId, courseId, completedPercent);
        res.status(201).json({ message });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateLastAccessedCourse = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const { courseId } = req.body;
        const message = await userService.updateLastAccessedCourse(userId, courseId);
        res.status(201).json({ message });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getLastAccessedCourse = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const lastAccessedCourseId = await userService.getLastAccessedCourse(userId);
        res.status(201).json({ lastAccessedCourseId });
      } catch (error) {    
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
