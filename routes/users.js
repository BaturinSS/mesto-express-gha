//* Oбъект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Импорт функций controllers
const {
  getUsers, getUser, getUserInfo,
  updateUser, updateUserAvatar,
} = require('../controllers/users');

//* Принимаем запросы /users
router
  .get('/', getUsers)
  .get('/me', getUserInfo)
  .get('/:id', getUser)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateUserAvatar);

//* Экспортировали роутер
module.exports = router;
