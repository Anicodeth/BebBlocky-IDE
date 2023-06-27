const mongoose = require('mongoose');

exports.slideSchema = new mongoose.Schema({
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
        type: String,
    },
    code: {
        type: String,
    },
    image: {
        type: String
    },
    // other relevant fields here
});