//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

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
  },
});

//* Создаем модель данных в mongoose
module.exports = mongoose.model('user', userSchema);
