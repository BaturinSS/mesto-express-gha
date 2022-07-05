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
    .catch((err) => {
      res
        .status(500)
        .send({
          message: `${err.name}: ${err.message}`,
        });
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `${err.name}: ${err.message}` });
      } else {
        res
          .status(500)
          .send({ message: `${err.name}: ${err.message}` });
      }
    });
};
module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .orFail(new Error('Такой карточки нет'))
    .then((card) => {
      res
        .status(200)
        .send({ message: 'Пост удалён', card });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res
          .status(404)
          .send({ message: `${err.name}: ${err.message}` });
      } else {
        res
          .status(400)
          .send({ message: `${err.name}: ${err.message}` });
      }
    });
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
