const Slide = require('../models/Slide');

exports.getAllSlides = async () => {
  return Slide.find();
};

exports.getHtmlSlides = async () => {
  return Slide.find({ courseCategory: 'html' });
};

exports.getCssSlides = async () => {
  return Slide.find({ courseCategory: 'css' });
};

exports.getJsSlides = async () => {
  return Slide.find({ courseCategory: 'js' });
};

exports.createSlide = async (slideData) => {
  const slide = new Slide(slideData);
  console.log('here');
  await slide.save();
  return slide;
};

exports.getSlideById = async (slideId) => {
  return Slide.findOne({ slideId });
};

exports.deleteSlideById = async (slideId) => {
  return Slide.findOneAndDelete({ slideId });
};
