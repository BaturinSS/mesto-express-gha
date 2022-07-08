//* Импортируем модуль jsonwebtoken для создания токена
const jwt = require('jsonwebtoken');

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
//* router.post('/sign-up', createUser);
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
//* router.post('/sign-in', login)
module.exports.login = (req, res) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  User
    .findUserByCredentials(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : 'b83c3dde3d27152bd25553962',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
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
module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
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
