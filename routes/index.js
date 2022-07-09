//* Объект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Подключаем валидацию Joi в качестве мидлвэр, будем использовать библиотеку celebrate
const { celebrate, Joi } = require('celebrate');

//* Импорт controllers
const { login, createUser } = require('../controllers/users');

//* Импортировать модуль users
const usersRouter = require('./users');

//* Импортировать модуль cards
const cardsRouter = require('./cards');

//* Импорт мидлвэр авторизации для зашиты роутов
const auth = require('../middlewares/auth');

//* Импорт классового элемента ошибки
const NotFoundError = require('../errors/NotFoundError');

//* Импорт констант
const { textErrorNotFound } = require('../utils/constants');

router
  .post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), login)
  .post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri().regex(/^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), createUser)
  .use(auth)
  .use('/users', usersRouter)
  .use('/cards', cardsRouter)
  .use('/', (req, res, next) => {
    next(new NotFoundError(textErrorNotFound));
  });

//* Экспортировали роутер
module.exports = router;
