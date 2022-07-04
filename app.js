//* Подключаем фреймворк express для сервера на ноде
const express = require('express');

//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Настроим порт, который должен слушать приложение
//* Возьмём его из переменной окружения
//* По умолчание установим порт 3000
const { PORT = 3000 } = process.env;

//* Создаем приложение методом express
const app = express();

//* Подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//* Установим слушателя на порт
app.listen(PORT, () => {
  //* Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
