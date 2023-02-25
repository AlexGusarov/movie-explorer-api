const { celebrate, Joi } = require('celebrate');
const userValidator = require('validator');
// const { httpRegex } = require('../constants');

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
        }),
      trailerLink: Joi.string()
        .required()
        .custom((value) => {
          if (userValidator.isURL(value)) {
            return value;
          }
        }),
      thumbnail: Joi.string()
        .required()
        .custom((value) => {
          if (userValidator.isURL(value)) {
            return value;
          }
        }),
      owner: Joi.required(),
      movieId: Joi.string().required(),
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

// const validateUserAuth = celebrate({
//   body: Joi.object()
//     .keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required(),
//       name: Joi.string().min(2).max(30),
//       about: Joi.string().min(2).max(30),
//       avatar: Joi.string().regex(httpRegex),
//     }),
// });

// const validateUserLogin = celebrate({
//   body: Joi.object()
//     .keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required(),
//     }),
// });

const validateUserUpdate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

// const validateUserID = celebrate({
//   params: Joi.object()
//     .keys({
//       userId: Joi.string().length(24).hex().required(),
//     }),
// });

// const validateAvatar = celebrate({
//   body: Joi.object()
//     .keys({
//       avatar: Joi.string().custom((value) => {
//         if (userValidator.isURL(value)) {
//           return value;
//         }
//       }),
//     }),
// });

module.exports = {
  validateCreatingMovie,
  validateMovieId,
  validateUserUpdate,

};
