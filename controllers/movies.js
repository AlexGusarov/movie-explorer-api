const Film = require('../models/film');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const BadRequestError = require('../errors/BadRequetError');
const CREATE_CODE = require('../constants');

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  Film.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// создаёт фильм с переданными в теле
// country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Film.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(CREATE_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${err.message}`));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  Film.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new NotFoundError('Фильм c таким id не найден'));
      }

      if (!movie.owner.equals(req.user._id)) {
        return Promise.reject(new Forbidden('Можно удалять только свои фильмы'));
      }
      return movie.delete()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
