//* Импорт модели данных
const Card = require('../models/card');

//* Экспорт функций в routes
module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch((err) => console.error(err));
};
module.exports.createCard = (req, res) => {
  Card
    .create(req.body)
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((err) => console.error(err));
};
module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch((err) => console.error(err));
};
module.exports.likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res
        .status(200)
        .send(card);
    })
    .catch((err) => console.error(err));
};
module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res
        .status(200)
        .send(card);
    })
    .catch((err) => console.error(err));
};
