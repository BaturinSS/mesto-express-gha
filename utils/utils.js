//* Сохраняем в константу сообщение об ошибке
module.exports.createdMessageError = (err) => ({ message: `${err.name}: ${err.message}` });
