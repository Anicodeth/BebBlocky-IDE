const User = require('../models/User');
const Slide = require('../models/Slide');
const authenticateJWT = require('../middleware/authentication');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserSlides = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const slides = await Slide.find();
        const userSlides = slides.filter(slide =>
          user.progress.some(progress => progress.slideId === slide.slideId)
        );
        res.json({ slides: userSlides });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserHtmlSlides = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const slides = await Slide.find({ courseCategory: 'html' });
        const userHtmlSlides = slides.filter(slide =>
          user.progress.some(progress => progress.slideId === slide.slideId)
        );
        res.json({ slides: userHtmlSlides });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserCssSlides = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const slides = await Slide.find({ courseCategory: 'css' });
        const userCssSlides = slides.filter(slide =>
          user.progress.some(progress => progress.slideId === slide.slideId)
        );
        res.json({ slides: userCssSlides });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserJsSlides = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const slides = await Slide.find({ courseCategory: 'javascript' });
        const userJsSlides = slides.filter(slide =>
          user.progress.some(progress => progress.slideId === slide.slideId)
        );
        res.json({ slides: userJsSlides });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserSlideProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        res.json({ progress: user.progress });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserSlideProgress = async (req, res) => {
  try {
    authenticateJWT(req, res, async () => {
      try {
        const userId = req.user.userId;
        const { slideId, completed } = req.body;
        console.log(slideId, completedPercent);
        const user = await User.findById(userId);

        // Find the progress object corresponding to the slideId
        const progressIndex = user.progress.findIndex(
          progress => progress.slideId === slideId
        );

        // Update the completion status
        if (progressIndex !== -1) {
          user.progress[progressIndex].completedPercent = completedPercent;
        } else {
          user.progress.push({ slideId, completedPercent });
        }

        // Save the updated user object
        await user.save();

        res.json({ message: 'Slide progress updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
