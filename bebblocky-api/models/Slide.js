const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  slideId: {
    type: Number,
    required: false,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseCategory: {
    type: String,
    required: true,
    enum: ['html', 'css', 'js'] // Restrict the category to these values
  },
  slides: [{
    backgroundColor: {
      type: String,
      required: true
    },
    font: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    // other relevant fields here
  }]
});

// Define a pre 'save' middleware to generate and assign the incrementing slideId
slideSchema.pre('save', async function (next) {
  const slide = this;
  if (slide.isNew) {
    try {
      const highestSlideId = await Slide.findOne().sort('-slideId').exec();
      const newSlideId = highestSlideId ? highestSlideId.slideId + 1 : 1;
      slide.slideId = newSlideId;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
