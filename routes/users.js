const router = require('express').Router();

const { getUserInfo, updateUser } = require('../controllers/movies');
const { validateUserUpdate } = require('../middlewares/validators');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
