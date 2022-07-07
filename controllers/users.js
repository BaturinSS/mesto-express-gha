//* Импорт модели данных
const User = require('../models/user');

//* Импорт констант
const {
  codOk, codCreated, codBadRequest, codForbidden,
  codInternalServerError, textErrorNoUser,
} = require('../utils/constants');

//* Импорт прочих функций из utils.js
const { createdMessageErrorControllers } = require('../utils/utils');

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
        .send(createdMessageErrorControllers(err));
    });
};
module.exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error(textErrorNoUser);
      }
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.message === textErrorNoUser) {
        res
          .status(codForbidden)
          .send(createdMessageErrorControllers(err));
      } else {
        res
          .status(codBadRequest)
          .send(createdMessageErrorControllers(err));
      }
    });
};
module.exports.updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new Error(textErrorNoUser);
      }
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageErrorControllers(err));
        return;
      } if (err.message === textErrorNoUser) {
        res
          .status(codForbidden)
          .send(createdMessageErrorControllers(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageErrorControllers(err));
      }
    });
};
module.exports.updateUserAvatar = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new Error(textErrorNoUser);
      }
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageErrorControllers(err));
        return;
      } if (err.message === textErrorNoUser) {
        res
          .status(codForbidden)
          .send(createdMessageErrorControllers(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageErrorControllers(err));
      }
    });
};
//* router.post('/', createUser)
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
          .send(createdMessageErrorControllers(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageErrorControllers(err));
      }
    });
};
