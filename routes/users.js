const router = require('express').Router();

const { getUserInfo, updateUser } = require('../controllers/movies');
// подключить валидаторы

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateUser);

module.exports = router;
