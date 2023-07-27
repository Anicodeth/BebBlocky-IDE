const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

const Course = require('../models/Course');
const User = require('../models/User');


async function asyncWrapper(callback) {
  try {
    return await callback();
  } catch (error) {
    if (error.name == 'MongoError') {
      if (error.code == 2) {
        throw new NotFoundError('User not found.');
      } else {
      throw new InternalServerError("Internal server error");
      }
    } else {
      throw error;
    }
  }
}

async function getUser(userId) {
  return await asyncWrapper(async () => {
    return await User.findById(userId);
  });
}

async function getUserCourses(userId, courseCategory) {
  return await asyncWrapper(async () => {
    const user = await User.findById(userId);
    const courses = (courseCategory)
      ? await Course.find({ courseCategory })
      : await Course.find();

    const usercourses = courses.filter(course =>
      user.progress.some(progress => progress.courseId === course.courseId)
    );
    return usercourses;
  });
}

async function getUserCourseProgress(userId, courseId) {
  return await asyncWrapper(async () => {
    const user = await User.findById(userId);
    const progress = user.progress.find(
      progress => progress.courseId == courseId
    );

    if (!progress) {
      throw new NotFoundError('Course progress not found.');
    }
    return progress;
  });
}

async function updateUserCourseProgress(userId, courseId, completedPercent) {
  return await asyncWrapper(async () => {
    const user = await User.findById(userId);
    const progress = user.progress.find(
      progress => progress.courseId == courseId
    );

    if (!progress) {
      user.progress.push({ courseId, completedPercent });
    }

    if (progress) {
      progress.completedPercent = completedPercent;
    }

    // Save the updated user object
    await user.save();

    return 'Course progress updated successfully.';
  });
}

async function updateLastAccessedCourse(userId, courseId) {
  return await asyncWrapper(async () => {
    const user = await User.findById(userId);

    // If the user doesn't have the attribute lastAccessedCourseId, add it
    user.lastAccessedCourseId = courseId;
    await user.save();

    return 'Course progress updated successfully.';
  });
}

async function getLastAccessedCourse(userId) {
  return await asyncWrapper(async () => {
    const user = await User.findById(userId);

    return user.lastAccessedCourseId;
  });
}

module.exports = {
  getUser,
  getUserCourses,
  getUserCourseProgress,
  updateUserCourseProgress,
  updateLastAccessedCourse,
  getLastAccessedCourse,
};
