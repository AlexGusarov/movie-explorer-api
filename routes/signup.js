const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateCreatingUser } = require('../middlewares/validators');

router.post('/signup', validateCreatingUser, createUser);

module.exports = router;
