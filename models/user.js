//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

//* Подключаем модуль для проверки данных на тип
const validatorjs = require('validator');

//* Импорт констант
const { textErrorNoValidEmailPassword } = require('../utils/constants');

//* Импорт классового элемента ошибки
const AuthError = require('../errors/AuthError');

//* Создаем схему для валидации данных в MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    maxlength: 500,
    validate: {
      validator(value) {
        return /^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/.test(value);
      },
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    validate: {
      validator: (value) => validatorjs.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    select: false,
  },
});

//* Собственные метод модели
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(textErrorNoValidEmailPassword);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(textErrorNoValidEmailPassword);
          }
          return user;
        });
    });
};

//* Создаем модель данных в mongoose
module.exports = mongoose.model('user', userSchema);
