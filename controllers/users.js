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
    .catch((err) => console.error(err));
};
module.exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => console.error(err));
};
module.exports.createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => {
      res
        .status(201)
        .send(user);
    })
    .catch((err) => console.error(err));
};
// module.exports.updateUser = (req, res) => {
//   User
//     .create(req.body)
//     .then((user) => {
//       res
//         .status(201)
//         .send(user);
//     })
//     .catch((err) => console.error(err));
// };
// module.exports.updateUserAvatar = (req, res) => {
//   User
//     .create(req.body)
//     .then((user) => {
//       res
//         .status(201)
//         .send(user);
//     })
//     .catch((err) => console.error(err));
// };
