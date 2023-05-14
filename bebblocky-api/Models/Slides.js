const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slideSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slides: [{
    instructions: {
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
