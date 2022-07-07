//* Подключаем фреймворк express для сервера на ноде
const express = require('express');

//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Подключаем модуль обработки запроса body
const bodyParser = require('body-parser');

//* Подключаем модуль обработки запроса cookie
const cookieParser = require('cookie-parser');

//* Подключаем модуль, предоставляет утилиты для работы с путями к файлам и каталогам
// const path = require('path');

//* Возьмём порт (по умолчанию 3000) из переменной окружения
const { PORT = 3000 } = process.env;

//* Импортировать модуль users
const usersRouter = require('./routes/users');

//* Импортировать модуль cards
const cardsRouter = require('./routes/cards');

//* Создаем приложение методом express
const app = express();

//* Подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

//* Импорт controllers
const { login, createUser } = require('./controllers/users');

//* Импорт мидлвэр авторизации для зашиты роутов
const auth = require('./middlewares/auth');

//* Обрабатываем запрос
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/sign-in', login);
app.post('/sign-up', createUser);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => {
  res
    .status(404)
    .send({ message: 'Страница не существет' });
});

//* Передаем статичную страницу
// app.use(express.static(path.join(__dirname, 'public')));

//* Установим слушателя на порт
app.listen(PORT);
