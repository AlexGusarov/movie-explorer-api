const CREATE_CODE = 201;

// сообщения ошибок для контроллера movies
const notFoundFilmMessage = 'Фильм c таким id не найден';
const forbiddenFilmMessage = 'Можно удалять только свои фильмы';
const deleteFilmMessage = 'Фильм удален';
const BadRequestFilmMessage = 'Некорректный id фильма';

// сообщения ошибок для контроллера users
const notFoundUserMessage = 'Пользователь с таким id не найден';
const conflictUserMessage = 'Пользователь с таким email уже зарегистрирован';
const unauthorizedUserMessage = 'Неправильный логин или пароль';

module.exports = {
  CREATE_CODE,
  notFoundFilmMessage,
  forbiddenFilmMessage,
  deleteFilmMessage,
  BadRequestFilmMessage,
  notFoundUserMessage,
  conflictUserMessage,
  unauthorizedUserMessage,
};
