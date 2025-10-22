const { describe, it, expect } = require('@jest/globals');

describe('smoke', () => {
  it('basic arithmetic', () => {
    expect(1 + 1).toBe(2);
  });
});
