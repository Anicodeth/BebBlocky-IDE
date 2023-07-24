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
  const result = await saveCourse(courseData);
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.error);
  }
};

exports.getCourseById = async (courseId) => {
  return Course.findOne({ courseId });
};

exports.deleteCourseById = async (courseId) => {
  return Course.findOneAndDelete({ courseId });
};

async function saveCourse(courseData) {
  const course = new Course(courseData);

  try {
    await course.validate();
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }

  try {
    const savedCourse = await course.save();
    return {
      success: true,
      data: savedCourse
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to save the course'
    };
  }
}
