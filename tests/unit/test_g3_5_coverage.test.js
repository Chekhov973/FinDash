/* eslint-env jest */
function uncoveredFunction() {
  return 42;
}

test("fail: uncoveredFunction не возвращает 43", () => {
  expect(uncoveredFunction()).toBe(43);
});

test("fail: uncoveredFunction возвращает строку", () => {
  expect(typeof uncoveredFunction()).toBe("string");
});

test("pass: uncoveredFunction возвращает 42", () => {
  expect(uncoveredFunction()).toBe(42);
});

test("pass: uncoveredFunction возвращает число", () => {
  expect(typeof uncoveredFunction()).toBe("number");
});

test("pass: uncoveredFunction больше 40", () => {
  expect(uncoveredFunction()).toBeGreaterThan(40);
});
