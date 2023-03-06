const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Должна быть валидная почта',
    },
    unique: true,

  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина - 2 символов'],
    maxlength: [30, 'Максимальная длина - 30 символов'],
  },
});

module.exports = mongoose.model('user', userSchema);
