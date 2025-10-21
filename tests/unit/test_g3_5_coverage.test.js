/* eslint-env jest */
/* global test, expect */
/* eslint-disable no-unused-vars */

// Тест для проверки G3.5 (unit test coverage)
// Эта функция не покрыта тестом, чтобы проверить, что CI блокирует PR при покрытии ниже 80%
function uncoveredFunction() {
  return 42;
}

// Для успешной проверки покрытия раскомментируйте тест ниже:
// test('covered function', () => {
//   expect(uncoveredFunction()).toBe(42);
// });
