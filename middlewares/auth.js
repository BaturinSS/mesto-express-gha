//* Импортируем модуль jsonwebtoken для верификации токена
const jwt = require('jsonwebtoken');

//* Импорт констант
const { textErrorAuthRequired } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: `${textErrorAuthRequired}` });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: `${textErrorAuthRequired}` });
  }
  req.user = payload;
  next();

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   throw new Error(textErrorAuthRequired);
  // }
  // const token = authorization.replace('Bearer ', '');
  // jwt.verify(token, 'some-secret-key')
  //   .then((payload) => {
  //     req.user = payload;
  //     console.log(payload);
  //   })
  //   .catch((err) => {
  //     if (err.message === textErrorAuthRequired) {
  //       res
  //         .status(codUnauthorized)
  //         .send(createdMessageErrorControllers(err));
  //     } else {
  //       res
  //         .status(codInternalServerError)
  //         .send(createdMessageErrorControllers(err));
  //     }
  //   });
};
