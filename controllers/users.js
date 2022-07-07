//* Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

//* Импорт модели данных
const User = require('../models/user');

//* Импорт констант
const {
  codOk, codCreated, codBadRequest, codForbidden,
  codInternalServerError, textErrorNoUser,
  textErrorNoValidEmailPassword, codUnauthorized,
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
//* Контроллер добавления в базу нового пользователя
//* router.post('/', createUser)
module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
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
            return;
          } if (err.name === 'MongoServerError') {
            res
              .status(codBadRequest)
              .send(createdMessageErrorControllers(err));
          } else {
            res
              .status(codInternalServerError)
              .send(createdMessageErrorControllers(err));
          }
        });
    })
    .catch((err) => {
      res
        .status(codInternalServerError)
        .send(createdMessageErrorControllers(err));
    });
};
//* Контроллер аутентификации(вход в приложение)
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .then((user) => {
      if (!user) {
        throw new Error(textErrorNoValidEmailPassword);
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new Error(textErrorNoValidEmailPassword);
      }
      res
        .status(codOk)
        .send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      if (err.message === textErrorNoValidEmailPassword) {
        res
          .status(codUnauthorized)
          .send(createdMessageErrorControllers(err));
      } else {
        res
          .status(codBadRequest)
          .send(createdMessageErrorControllers(err));
      }
    });
};
