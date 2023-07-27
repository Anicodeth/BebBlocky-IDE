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

exports.createUserWithVerification = async (username, email, password, verificationCode) => {
  return await asyncWrapper(async () => {
    // try and see if any other user exists with the same username
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new BadRequestError('Another user exists with the same username.');
    }

    // try and see if any other user exists with the same username
    existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Another user exists with the same email.');
    }

    const salt = await generateSalt();
    password = await hashPassword(salt, password);

    const user = new User({ username, salt, email, password, verificationCode });

    return await user.save();
  });
};

exports.createUser = async (username, email, password) => {
  return await asyncWrapper(async () => {
    // try and see if any other user exists with the same username
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new BadRequestError('Another user exists with the same username.');
    }

    // try and see if any other user exists with the same username
    existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Another user exists with the same email.');
    }

    const salt = await generateSalt();
    password = await hashPassword(salt, password);

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
      throw new NotFoundError('User does not exist.');
    }

    const isValid = await validatePassword(user.salt, password, user.password);
    if (!isValid) {
      throw new BadRequestError('Invalid username or password.');
    }

    const token = jwt.sign({ userId: user._id }, 'Ananya');
    return { user, token };
  });
};

exports.verifyCode = async (code) => {
  return await asyncWrapper(async () => {
    const user = await User.findOne({ emailVerificationCode: code });

    if (!user) {
      throw new BadRequestError('Verification code not found.');
    }

    // Mark the email as verified and save the user
    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    return await user.save();
  });
}
