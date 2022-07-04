//* Oбъект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

//* Принимаем запросы
router
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', createUser);

//* Экспортировали роутер
module.exports = router;
