//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Подключаем модуль для проверки данных на тип
const validatorjs = require('validator');

//* Создаем схему для валидации данных в MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validatorjs.isURL(value),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validatorjs.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

//* Создаем модель данных в mongoose
module.exports = mongoose.model('user', userSchema);
