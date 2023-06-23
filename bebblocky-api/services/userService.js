const User = require('../models/User');
const Slide = require('../models/Slide');

async function getUser(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function getUserSlides(userId, courseCategory) {
  try {
    const user = await User.findById(userId);
    const slides = (courseCategory)
      ? await Slide.find({ courseCategory })
      : await Slide.find();

    const userSlides = slides.filter(slide =>
      user.progress.some(progress => progress.slideId === slide.slideId)
    );
    return userSlides;
  } catch (error) {throw new Error('Internal server error');
  }
}

async function getUserSlideProgress(userId, slideId) {
  try {
    const user = await User.findById(userId);
    const progress = user.progress.find(
      progress => progress.slideId == slideId
    );
    return progress;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function updateUserSlideProgress(userId, slideId, completedPercent) {
  try {
    const user = await User.findById(userId);
    const progress = user.progress.find(
      progress => progress.slideId == slideId
    );

    if (!progress) {
      user.progress.push({ slideId, completedPercent });
    }

    if (progress) {
      progress.completedPercent = completedPercent;
    }

    // Save the updated user object
    await user.save();

    return 'Slide progress updated successfully';
  } catch (error) {
    throw new Error('Internal server error');
  }
}

module.exports = {
  getUser,
  getUserSlides,
  getUserSlideProgress,
  updateUserSlideProgress
};
