const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slideSchema = new Schema({
  slideId: {
    type:Number,
    required: true
  }, 
  courseName: {
    type: String,
    required: true
  },
  slides:[{
    backgroundColor: 
    {
      type: String,
      required: true
    },
    font: {
      type: String,
      required: true
    },
    title:  {
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


const Slides = mongoose.model('Slide', slideSchema);

module.exports = { Slides };
