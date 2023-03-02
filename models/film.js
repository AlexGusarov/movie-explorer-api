const mongoose = require('mongoose');
const validator = require('validator');

const filmSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Необходимо указать название фильма'],
  },

  director: {
    type: String,
    required: [true, 'Необходимо указать режиссера фильма'],
  },

  duration: {
    type: Number,
    required: [true, 'Необходимо указать длительность фильма'],
  },

  year: {
    type: String,
    required: [true, 'Необходимо указать год фильма'],
  },

  description: {
    type: String,
    required: [true, 'Необходимо описание фильма'],
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
    type: Number,
    required: [true, 'Необходимо указать id фильма'],
  },

  // название фильма на русском
  nameRU: {
    type: String,
    required: [true, 'Необходимо указать название фильма на русском языке'],
  },

  // название фильма на английском
  nameEN: {
    type: String,
    required: [true, 'Необходимо указать название фильма на английском языке'],
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('film', filmSchema);
