const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreatingMovie, validateMovieId } = require('../middlewares/validators');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', validateCreatingMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;
