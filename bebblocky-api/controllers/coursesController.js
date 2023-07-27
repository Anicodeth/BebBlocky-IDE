const courseService = require('../services/coursesService');
const asyncWrapper = require('../utils/controllerAsyncWrapper');

//Entire courses
exports.getCourses = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ courses });
  }, next);
};

//Entire Html courses
exports.getHtmlCourses = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const htmlCourses = await courseService.getHtmlCourses();
    res.status(200).json({ courses: htmlCourses });
  }, next);
};

//Entire Css courses
exports.getCssCourses = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const cssCourses = await courseService.getCssCourses();
    res.status(200).json({ courses: cssCourses });
  }, next);
};

//Entire Js courses
exports.getJsCourses = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const jsCourses = await courseService.getJsCourses();
    res.status(200).json({ courses: jsCourses });
  }, next);
};

//Entire React courses
exports.addCourse = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const courseData = req.body;
    const createdCourse = await courseService.createCourse(courseData);
    res.status(201).json(createdCourse);
  }, next);
};

//Entire React courses
exports.getCourse = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await courseService.getCourseById(courseId);
    res.status(200).json({ course });
  }, next);
};

//Entire React courses
exports.deleteCourse = async (req, res, next) => {
  return asyncWrapper(req, res, async (req, res) => {
    const courseId = req.params.courseId;
    await courseService.deleteCourseById(courseId);
    res.status(200).json({ message: 'Course deleted successfully' });
  }, next);
};
