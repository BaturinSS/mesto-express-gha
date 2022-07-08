//* Объект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Импорт функций controllers
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

//* Принимаем запросы
router
  .get('/', getCards)
  .post('/', createCard)
  .put('/:cardId/likes', likeCard)
  .delete('/:cardId', deleteCard)
  .delete('/:cardId/likes', dislikeCard);

//* Экспортировали роутер
module.exports = router;
