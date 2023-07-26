const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');

async function hashPassword(salt, password) {
  return await bcrypt.hash(password, salt);
}

async function generateSalt() {
  return await bcrypt.genSalt(10);
}

async function validatePassword(salt, plainPassword, hashedPassword) {
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash === hashedPassword;
}


async function asyncWrapper(callback) {
  try {
    return await callback();
  } catch (error) {
    if (error.name == 'MongoError') {
      if (error.code == 11000)
        throw new BadRequestError('User already exists.');
      else if (error.code == 2)
        throw new NotFoundError('User not found.');
      else
        throw new InternalServerError(error.message);
    } else {
      throw error;
    }
  }
}

exports.createUser = async (username, email, password) => {
  return await asyncWrapper(async () => {
    // try and see if any other user exists with the same username
    let existingUser = User.find({ username });
    if (existingUser) {
      throw new BadRequestError('Another user exists with the same username.');
    }

    // try and see if any other user exists with the same username
    existingUser = User.find({ email });
    if (existingUser) {
      throw new BadRequestError('Another user exists with the same email.');
    }

    const salt = await generateSalt();
    password = await hashPassword(salt, password);

    console.log('creating a new user: controller', username, email, password, salt);

    const user = new User({ username, salt, email, password });

    return await user.save();
  });
};

exports.getUserByUsername = async (username) => {
  return await asyncWrapper(async () => {
    return await User.findOne({ username });
  });
};

exports.loginUser = async (username, password) => {
  return await asyncWrapper(async () => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new BadRequestError('Invalid username or password.');
    }

    const isValid = await validatePassword(user.salt, password, user.password);
    if (!isValid) {
      throw new BadRequestError('Invalid username or password.');
    }

    const token = jwt.sign({ userId: user._id }, 'Ananya');
    return { user, token };
  });
};
