/* eslint-env jest */
/* global test, expect */

// Тест для проверки G3.4 (unit тесты)
// Этот тест должен упасть, чтобы проверить, что CI блокирует PR при ошибке unit теста.
test("unit fail G3.4", () => {
  expect(1 + 1).toBe(4);
});
