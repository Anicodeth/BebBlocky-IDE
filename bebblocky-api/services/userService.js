const User = require('../models/User');
const course = require('../models/Course');

async function getUser(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function getUsercourses(userId, courseCategory) {
  try {
    const user = await User.findById(userId);
    const courses = (courseCategory)
      ? await course.find({ courseCategory })
      : await course.find();

    const usercourses = courses.filter(course =>
      user.progress.some(progress => progress.courseId === course.courseId)
    );
    return usercourses;
  } catch (error) {throw new Error('Internal server error');
  }
}

async function getUsercourseProgress(userId, courseId) {
  try {
    const user = await User.findById(userId);
    const progress = user.progress.find(
      progress => progress.courseId == courseId
    );
    return progress;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function updateUsercourseProgress(userId, courseId, completedPercent) {
  try {
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

    return 'course progress updated successfully';
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function updateLastAccessedcourse(userId, courseId) {
  try {
    const user = await User.findById(userId);
    user.lastAccessedcourseId = courseId;

    // Save the updated user object
    await user.save();

    return 'course progress updated successfully';
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function getLastAccessedcourse(userId) {
  try {
    const user = await User.findById(userId);

    return user.lastAccessedcourseId;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

module.exports = {
  getUser,
  getUsercourses,
  getUsercourseProgress,
  updateUsercourseProgress,
  updateLastAccessedcourse,
  getLastAccessedcourse,
};
