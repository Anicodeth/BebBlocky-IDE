const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  backgroundColor: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  titleFont: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentFont: {
    type: String,
    required: true
  },
  startingCode: {
    type: String
  },
  code: {
    type: String,
  },
  image: {
    type: String
  },
  requiresPastProgress: {
    type: Boolean
  },
  shouldBeSaved: {
    type: Boolean
  }
  // other relevant fields here
});

const lessonSchema = new mongoose.Schema({
  lessonId: {
    type: Number
  },
  lessonTitle: {
    type: String,
    required: true
  },
  lessonDescription: {
    type: String,
  },
  lessonLanguage: {
    type: String,
    required: true,
    enum: ['html', 'css', 'js', 'python']
  },
  slides: [
    slideSchema
  ]
});

const courseSchema = new mongoose.Schema({
  courseId: {
    type: Number,
    unique: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  courseDescription: {
    type: String,
    required: true
  },
  courseLanguage: {
    type: String,
    required: true,
    enum: ['html', 'css', 'js', 'python']
  },
  lessons: [
    lessonSchema
  ]
});

// Define a pre 'save' middleware to generate and assign the incrementing courseId
courseSchema.pre('save', async function (next) {
  const course = this;
  if (course.isNew) {
    try {
      const highestCourseId = await Course.findOne().sort('-courseId').exec();
      const newCourseId = highestCourseId ? highestCourseId.courseId + 1 : 1;
      course.courseId = newCourseId;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
