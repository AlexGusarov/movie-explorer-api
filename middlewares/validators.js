const { celebrate, Joi } = require('celebrate');
const userValidator = require('validator');

const validateCreatingMovie = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .custom((value) => {
          if (userValidator.isURL(value)) {
            return value;
          }
          return '';
        }),
      trailerLink: Joi.string()
        .required()
        .custom((value) => {
          if (userValidator.isURL(value)) {
            return value;
          }
          return '';
        }),
      thumbnail: Joi.string()
        .required()
        .custom((value) => {
          if (userValidator.isURL(value)) {
            return value;
          }
          return '';
        }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
});

const validateMovieId = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
});

const validateCreatingUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
    }),
});

const validateUserLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

const validateUserUpdate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
    }),
});

module.exports = {
  validateCreatingMovie,
  validateMovieId,
  validateUserUpdate,
  validateCreatingUser,
  validateUserLogin,
};
