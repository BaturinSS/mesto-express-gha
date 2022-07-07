//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

//* Подключаем модуль для проверки данных на тип
const validatorjs = require('validator');

//* Импорт констант
const { textErrorNoValid, textErrorNoValidEmailPassword } = require('../utils/constants');

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
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => validatorjs.isURL(value),
      message: (props) => `${textErrorNoValid} - '${props.value}'`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    validate: {
      validator: (value) => validatorjs.isEmail(value),
      message: (props) => `${textErrorNoValid} - '${props.value}'`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

//* Собственные метод модели
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new Error(textErrorNoValidEmailPassword);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error(textErrorNoValidEmailPassword);
          }
          return user;
        });
    });
};

//* Создаем модель данных в mongoose
module.exports = mongoose.model('user', userSchema);
