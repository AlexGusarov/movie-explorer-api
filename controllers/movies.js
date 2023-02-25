const Film = require('../models/film');

// подключить CREATE_CODE
// подключить NotFoundError, Forbidden, BadRequestError

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  // если owner === текущий owner
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
    trailer,
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => Film.populate(movie, 'owner'))
    // .then((movie) => {
    // res.status(CREATE_CODE).send(movie);
    // })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

// удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  Film.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        // return Promise.reject(new NotFoundError('Карточка c таким id не найдена'));
      }

      if (!movie.owner.equals(req.user._id)) {
        // return Promise.reject(new Forbidden('Можно удалять только свои карточки'));
      }
      return movie.delete()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // return next(new BadRequestError('Некорректный id карточки'));
      }
      next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
