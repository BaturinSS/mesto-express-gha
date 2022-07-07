//* Сохраняем в константу сообщение об ошибке для controllers
module.exports.createdMessageErrorControllers = (err) => ({ message: `${err.name}: ${err.message}` });
