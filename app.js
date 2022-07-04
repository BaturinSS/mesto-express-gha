//* Подключаем фреймворк express для сервера на ноде
const express = require('express');

//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Подключаем модуль обработки запроса body
const bodyParser = require('body-parser');

//* Возьмём порт (по умолчанию 3000) из переменной окружения
const { PORT = 3000 } = process.env;

//* Импортировать модуль users
const usersRouter = require('./routes/users');

//* Создаем приложение методом express
const app = express();

//* Промежуточный обработчик запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//* Подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

//* Перенаправляем запрос на нужный адрес
app.use('/users', usersRouter);

//* Установим слушателя на порт
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
