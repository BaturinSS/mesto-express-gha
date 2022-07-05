//* Импорт модели данных
const User = require('../models/user');

//* Импорт констант
const {
  codOk, codCreated, codBadRequest, codForbidden,
  codInternalServerError, createdMessageError,
  textErrorNoUser,
} = require('../utils/constants');

//* Экспорт функций в routes
module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => {
      res
        .status(codOk)
        .send(users);
    })
    .catch((err) => {
      res
        .status(codInternalServerError)
        .send(createdMessageError(err));
    });
};
module.exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .orFail(new Error(textErrorNoUser))
    .then((user) => {
      res
        .status(codOk)
        .send(user);
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
module.exports.updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .orFail(new Error(textErrorNoUser))
    .then((user) => {
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      } if (err.name === 'Error') {
        res
          .status(codForbidden)
          .send(createdMessageError(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageError(err));
      }
    });
};
module.exports.updateUserAvatar = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .orFail(new Error(textErrorNoUser))
    .then((user) => {
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      } if (err.name === 'Error') {
        res
          .status(codForbidden)
          .send(createdMessageError(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageError(err));
      }
    });
};
module.exports.createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => {
      res
        .status(codCreated)
        .send(user);
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
