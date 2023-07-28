const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const Course = require('../models/Course');


async function asyncWrapper(callback) {
  try {
    return await callback();
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Extracting the field names from the error message
      const missingFields = error.message.match(/Path `([^`]+)` is required\./g);

      // Creating a user-friendly error message
      let errorMessage = 'Invalid course data. The following fields are required: ';
      errorMessage += missingFields.map(field => field.match(/`([^`]+)` is required\./)[1]).join(', ');
      errorMessage += '.';

      throw new BadRequestError(errorMessage);
    } else if (error.name == 'MongoError') {
      if (error.code == 2)
        throw new NotFoundError('Course not found.');
      else
        throw new InternalServerError(error.message);
    } else {
      throw error;
    }
  }
}

exports.getAllCourses = async () => {
  return await asyncWrapper(async () => {
    return await Course.find();
  });
};

exports.getHtmlCourses = async () => {
  return await asyncWrapper(async () => {
    return await Course.find({ courseLanguage: 'html' });
  });
};

exports.getCssCourses = async () => {
  return await asyncWrapper(async () => {
    return await Course.find({ courseLanguage: 'css' });
  });
};

exports.getJsCourses = async () => {
  return await asyncWrapper(async () => {
    return await Course.find({ courseLanguage: 'js' });
  });
};


exports.getCourseById = async (courseId) => {
  return await asyncWrapper(async () => {
    const course = await Course.findOne({ courseId });
    if (!course) {
      throw new NotFoundError('Course not found.');
    }
    return course;
  });
};

exports.createCourse = async (courseData) => {
  return await asyncWrapper(async () => {
    return await Course.create(courseData);
  });
};

exports.deleteCourseById = async (courseId) => {
  return await asyncWrapper(async () => {
    const course = await Course.findOne({ courseId });
    if (!course) {
      throw new NotFoundError('Course not found.');
    }
    return await Course.findOneAndDelete({ courseId });
  });
};

exports.updateCourseById = async (courseId, courseData) => {
  return await asyncWrapper(async () => {
    let course = await Course.findOne({ courseId });
    if (!course) {
      throw new NotFoundError('Course not found.');
    }

    // find one by id and update it
    return await Course.findByIdAndUpdate(course._id, courseData, { new: true });
  });
};

