/* eslint-disable no-undef */
it('Создаем экземпляр объекта ошибки AccessError', () => {
  expect(new AccessError('Можно удалять только свои карточки!')).toBe(new AccessError('Можно удалять только свои карточки!'));
});

//! Не работает
