/* eslint-env jest */
/* global test, expect */

// Тест, который должен не пройти (эмулирует ошибку e2e)
test("fail: страница содержит неверный заголовок", () => {
  const pageTitle = "FinDash";
  expect(pageTitle).toBe("WrongTitle");
});

// Тест, который должен пройти (эмулирует успешный e2e)
test("pass: страница содержит правильный заголовок", () => {
  const pageTitle = "FinDash";
  expect(pageTitle).toBe("FinDash");
});

// Тест, который должен пройти (эмулирует успешную авторизацию)
test("pass: пользователь успешно авторизован", () => {
  const isLoggedIn = true;
  expect(isLoggedIn).toBe(true);
});
