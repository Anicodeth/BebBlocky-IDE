const courseService = require('../services/coursesService');

exports.getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getHtmlCourses = async (req, res) => {
  try {
    const htmlCourses = await courseService.getHtmlCourses();
    res.status(200).json({ courses: htmlCourses });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCssCourses = async (req, res) => {
  try {
    const cssCourses = await courseService.getCssCourses();
    res.status(200).json({ courses: cssCourses });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getJsCourses = async (req, res) => {
  try {
    const jsCourses = await courseService.getJsCourses();
    res.status(200).json({ courses: jsCourses });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const createdCourse = await courseService.createCourse(courseData);
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await courseService.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const deletedCourse = await courseService.deleteCourseById(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
