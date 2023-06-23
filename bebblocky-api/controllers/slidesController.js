const slideService = require('../services/slidesService');

exports.getSlides = async (req, res) => {
  try {
    const slides = await slideService.getAllSlides();
    res.status(200).json({ slides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getHtmlSlides = async (req, res) => {
  try {
    const htmlSlides = await slideService.getHtmlSlides();
    res.status(200).json({ slides: htmlSlides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCssSlides = async (req, res) => {
  try {
    const cssSlides = await slideService.getCssSlides();
    res.status(200).json({ slides: cssSlides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getJsSlides = async (req, res) => {
  try {
    const jsSlides = await slideService.getJsSlides();
    res.status(200).json({ slides: jsSlides });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.postSlide = async (req, res) => {
  try {
    const slideData = req.body;
    const createdSlide = await slideService.createSlide(slideData);
    res.status(201).json(createdSlide);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSlide = async (req, res) => {
  try {
    const slideId = req.params.slideId;
    const slide = await slideService.getSlideById(slideId);

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
    const deletedSlide = await slideService.deleteSlideById(slideId);

    if (!deletedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    res.status(200).json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
