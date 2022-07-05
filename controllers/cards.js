//* Импорт модели данных
const Card = require('../models/card');

//* Импорт констант
const {
  codOk, codCreated, codBadRequest, codForbidden,
  codInternalServerError, createdMessageError,
  textErrorNoCard,
} = require('../utils/constants');

//* Экспорт функций в routes
module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => {
      res
        .status(codOk)
        .send(cards);
    })
    .catch((err) => {
      res
        .status(codInternalServerError)
        .send(createdMessageError(err));
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res
        .status(codCreated)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageError(err));
      }
    });
};
module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new Error(textErrorNoCard);
      }
      res
        .status(codOk)
        .send({ message: 'Пост удалён', card });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res
          .status(codForbidden)
          .send(createdMessageError(err));
      } else {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
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
      if (!card) {
        throw new Error(textErrorNoCard);
      }
      res
        .status(codOk)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res
          .status(codForbidden)
          .send(createdMessageError(err));
      } else {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new Error(textErrorNoCard);
      }
      res
        .status(codOk)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res
          .status(codForbidden)
          .send(createdMessageError(err));
      } else {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      }
    });
};
