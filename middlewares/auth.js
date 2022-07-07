//* Импортируем модуль jsonwebtoken для верификации токена
const jwt = require('jsonwebtoken');

//* Импорт констант
const { textErrorAuthRequired } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .send({ message: `${textErrorAuthRequired}` });
  }
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
};
