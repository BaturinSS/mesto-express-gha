//* Oбъект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Импорт модели данных
const User = require('../models/user');

//* Принимаем запрос GET
router
  .get('/', (req, res) => {
    User
      .find({})
      .then((users) => {
        res
          .status(200)
          .send(users);
      })
      .catch((err) => console.error(err));
  })
  .get('/:id', (req, res) => {
    User
      .findById(req.params.id)
      .then((user) => {
        res
          .status(200)
          .send(user);
      })
      .catch((err) => console.error(err));
  })
  .post('/', (req, res) => {
    User
      .create(req.body)
      .then((user) => {
        res
          .status(201)
          .send(user);
      })
      .catch((err) => console.error(err));
  });

//* Экспортировали роутер
module.exports = router;
