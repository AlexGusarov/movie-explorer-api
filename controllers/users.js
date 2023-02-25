const User = require('../models/user');
// подключить класс ошибки NotFoundError
// BadRequestError

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        // return Promise.reject(new NotFoundError('Пользователь с таким id не найден'));
      }
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        // return Promise.reject(new NotFoundError('Пользователь с таким id не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports = { getUserInfo, updateUser };
