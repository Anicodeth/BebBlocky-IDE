const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  courseId: {
    type: Number,
    required: true
  },
  completedPercent: {
    type: Number,
    required: true,
    default: 0
  }
});

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: false,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  salt: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationCode: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
  },
  role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
  },
  progress: [
    progressSchema,
  ],
  lastAccessedCourseId: {
    type: Number,
    required: true,
    default: 1
  }
});

// Define a pre 'save' middleware to generate and assign the incrementing userId
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isNew) {
    try {
      const highestUserId = await User.findOne().sort('-userId').exec();
      const newUserId = highestUserId ? highestUserId.userId + 1 : 1;
      user.userId = newUserId;
    } catch (error) {  return next(error);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
