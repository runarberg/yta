import assert from "node:assert/strict";
import test, { suite } from "node:test";

import of from "../of.js";

suite("sync/generators/of", () => {
  test("of", () => {
    const iter = of(1, 2, 3)[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });

  test("empty", () => {
    const iter = of()[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });
});
