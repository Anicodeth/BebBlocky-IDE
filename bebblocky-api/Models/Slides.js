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

module.exports = mongoose.model('Slide', slideSchema);