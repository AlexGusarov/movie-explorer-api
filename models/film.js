const mongoose = require('mongoose');
const validator = require('validator');

const filmSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  // ссылка на постер к фильму
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Должен быть валидный url-адрес',
    },
  },

  // ссылка на трейлер к фильму
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Должен быть валидный url-адрес',
    },
  },

  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Должен быть валидный url-адрес',
    },
  },

  // _id пользователя, который сохранил фильм
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'film',
    required: true,
  },

  // название фильма на русском
  nameRU: {
    type: String,
    required: true,
  },

  // название фильма на английском
  nameEN: {
    type: String,
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('film', filmSchema);
