const Course = require('../models/Course');

exports.getAllCourses = async () => {
  return Course.find();
};

exports.getHtmlCourses = async () => {
  return Course.find({ courseLanguage: 'html' });
};

exports.getCssCourses = async () => {
  return Course.find({ courseLanguage: 'css' });
};

exports.getJsCourses = async () => {
  return Course.find({ courseLanguage: 'js' });
};

exports.createCourse = async (courseData) => {
  console.log(courseData);
  const course = new Course(courseData);
  await course.save();
  return course;
};

exports.getCourseById = async (courseId) => {
  return Course.findOne({ courseId });
};

exports.deleteCourseById = async (courseId) => {
  return Course.findOneAndDelete({ courseId });
};
