import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { range } from "../../index.js";
import chain from "../chain.js";

suite("sync/combinators/chain", () => {
  test("chain", () => {
    const iter = chain(range(0, 3), range(3, 6))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
