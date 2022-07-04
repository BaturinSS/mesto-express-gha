//* Oбъект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Принимаем запрос GET
router.get('/', (req, res) => {
  res.send(`Пользователь ${name}, ${age} лет`);
});

router.get('/:id', (req, res) => {
  if (!users[req.params.id]) {
    res.send('Такого пользователя не существует');
    return;
  }

  const { name, age } = users[req.params.id];

  res.send(`Пользователь ${name}, ${age} лет`);
});

//* Экспортировали роутер
module.exports = router;
