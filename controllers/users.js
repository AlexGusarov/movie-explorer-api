const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequetError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const {
  CREATE_CODE,
  notFoundUserMessage,
  conflictUserMessage,
  unauthorizedUserMessages,
} = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        Promise.reject(new NotFoundError(notFoundUserMessage));
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email, password: hash,
    });
    return res.status(CREATE_CODE).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError(conflictUserMessage));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(`${err.message}`));
    }
    return next(err);
  }
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError(notFoundUserMessage));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(conflictUserMessage));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${err.message}`));
      }
      return next(err);
    });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError(unauthorizedUserMessages);
    } else {
      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        throw new UnauthorizedError(unauthorizedUserMessages);
      } else {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        return res.send({ token });
      }
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUserInfo,
  updateUser,
  login,
  createUser,
};
