const Slide = require('../models/Slide');

exports.getSlides = async (req, res) => {
  try {
    // Retrieve all slides
    const slides = await Slide.find();
    res.status(200).json({ slides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getHtmlSlides = async (req, res) => {
  try {
    // Retrieve HTML slides
    const htmlSlides = await Slide.find({ courseCategory: 'html' });
    res.status(200).json({ slides: htmlSlides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCssSlides = async (req, res) => {
  try {
    // Retrieve CSS slides
    const cssSlides = await Slide.find({ courseCategory: 'css' });
    res.status(200).json({ slides: cssSlides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getJsSlides = async (req, res) => {
  try {
    // Retrieve JavaScript slides
    const jsSlides = await Slide.find({ courseCategory: 'js' });
    res.status(200).json({ slides: jsSlides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.postSlide = async (req, res) => {
  try {
    const slideData = req.body;

    // Create a new slide
    const slide = new Slide(slideData);

    // Save the slide
    await slide.save();

    res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSlide = async (req, res) => {
  try {
    const slideId = req.params.slideId;

    // Find the slide by slideId
    const slide = await Slide.findOne({ slideId });

    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    res.status(200).json({ slide });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const slideId = req.params.slideId;

    // Find and delete the slide by slideId
    const deletedSlide = await Slide.findOneAndDelete({ slideId });

    if (!deletedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    res.status(200).json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};