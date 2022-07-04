//* Oбъект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Импорт функций controllers
const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

//* Принимаем запросы
router
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', createUser)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateUserAvatar);

//* Экспортировали роутер
module.exports = router;
