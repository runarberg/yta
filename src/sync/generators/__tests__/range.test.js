import assert from "node:assert/strict";
import test, { suite } from "node:test";

import range from "../range.js";

suite("sync/generators/range", () => {
  test("range with no args", () => {
    const iter = range()[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.deepEqual(iter.next(), { value: 5, done: false });
  });

  test("range with only one arg", () => {
    assert.deepEqual([...range(1)], [0]);
    assert.deepEqual([...range(5)], [0, 1, 2, 3, 4]);
  });

  test("range with start and stop", () => {
    assert.deepEqual([...range(0, 0)], []);
    assert.deepEqual([...range(0, 1)], [0]);
    assert.deepEqual([...range(5, 10)], [5, 6, 7, 8, 9]);
  });

  test("range with start, stop, and step", () => {
    assert.deepEqual([...range(0, 0, 0)], []);
    assert.deepEqual([...range(0, 2, 2)], [0]);
    assert.deepEqual([...range(5, 15, 3)], [5, 8, 11, 14]);
    assert.deepEqual([...range(5, 0, -1)], [5, 4, 3, 2, 1]);
  });
});
