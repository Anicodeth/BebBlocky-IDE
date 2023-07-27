const userService = require('../services/userService');
const asyncWrapper = require('../utils/controllerAsyncWrapper');

function getUserCoursesByType(req, res, category, next) {
  return asyncWrapper(req, res, async (req, res) => {
    const userId = req.user._id;
    const userCourses = await userService.getUserCourses(userId, category);
    res.status(200).json({ courses: userCourses });
  }, next);
}

exports.getUser = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    res.status(200).json({ user: req.user });
  }, next);
};

exports.getUserCourses = async (req, res, next) => {
  getUserCoursesByType(req, res, '', next);
};

exports.getUserHtmlCourses = async (req, res, next) => {
  getUserCoursesByType(req, res, 'html', next);
};

exports.getUserCssCourses = async (req, res, next) => {
  getUserCoursesByType(req, res, 'css', next);
};

exports.getUserJsCourses = async (req, res, next) => {
  getUserCoursesByType(req, res, 'js', next);
};

exports.getUserCourseProgress = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;
    const progress = await userService.getUserCourseProgress(userId, courseId);
    res.status(200).json({ progress });
  }, next);
};

exports.updateUserCourseProgress = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const { completedPercent } = req.body;
    const message = await userService.updateUserCourseProgress(userId, courseId, completedPercent);
    res.status(201).json({ message });
  }, next);
};

exports.updateLastAccessedCourse = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const userId = req.user._id;
    const { courseId } = req.body;
    const message = await userService.updateLastAccessedCourse(userId, courseId);
    res.status(201).json({ message });
  }, next);
};


exports.getLastAccessedCourse = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const userId = req.user._id;
    const lastAccessedCourseId = await userService.getLastAccessedCourse(userId);
    res.status(201).json({ lastAccessedCourseId });
  }, next);
};
