//* Импорт модели данных
const User = require('../models/user');

//* Экспорт функций в routes
module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => {
      res
        .status(200)
        .send(users);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: `${err.name}: ${err.message}`,
        });
    });
};
module.exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .orFail(new Error('Такого пользователя нет'))
    .then((user) => {
      res
        .status(200)
        .send(user);
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
module.exports.updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .orFail(new Error('Такого пользователя нет'))
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `${err.name}: ${err.message}` });
      } if (err.name === 'Error') {
        res
          .status(404)
          .send({ message: `${err.name}: ${err.message}` });
      } else {
        res
          .status(500)
          .send({ message: `${err.name}: ${err.message}` });
      }
    });
};
module.exports.updateUserAvatar = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .orFail(new Error('Такого пользователя нет'))
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `${err.name}: ${err.message}` });
      } if (err.name === 'Error') {
        res
          .status(404)
          .send({ message: `${err.name}: ${err.message}` });
      } else {
        res
          .status(500)
          .send({ message: `${err.name}: ${err.message}` });
      }
    });
};
module.exports.createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => {
      res
        .status(201)
        .send(user);
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
