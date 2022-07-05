//* Сохраняем в константу код ответа «хорошо»
module.exports.codOk = 200;

//* Сохраняем в константу код ответа «создано»
module.exports.codCreated = 201;

//* Сохраняем в константу код ответа «неправильный, некорректный запрос»
module.exports.codBadRequest = 400;

//* Сохраняем в константу код ответа «не найдено»
module.exports.codForbidden = 404;

//* Сохраняем в константу код ответа «внутренняя ошибка сервера»
module.exports.codInternalServerError = 500;

//* Сохраняем в константу сообщение об ошибке
module.exports.createdMessageError = (err) => ({ message: `${err.name}: ${err.message}` });

//* Сохраним в константу техт ошибки 'Такого пользователя нет'
module.exports.textErrorNoUser = 'Такого пользователя нет';
