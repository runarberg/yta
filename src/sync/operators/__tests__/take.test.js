import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import take from "../take.js";

suite("sync/operators/take", () => {
  test("take 0", () => {
    const iter = pipe(range(), take(0))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("take 5", () => {
    const iter = pipe(range(), take(5))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.equal(iter.next().done, true);
  });

  test("take more then all", () => {
    const iter = pipe(range(0, 2), take(5))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.equal(iter.next().done, true);
  });

  test("take from end", () => {
    const iter = pipe(range(0, 15), take(-5))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 10, done: false });
    assert.deepEqual(iter.next(), { value: 11, done: false });
    assert.deepEqual(iter.next(), { value: 12, done: false });
    assert.deepEqual(iter.next(), { value: 13, done: false });
    assert.deepEqual(iter.next(), { value: 14, done: false });
    assert.equal(iter.next().done, true);
  });

  test("take non-divisive from end", () => {
    const iter = pipe(range(0, 15), take(-4))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 11, done: false });
    assert.deepEqual(iter.next(), { value: 12, done: false });
    assert.deepEqual(iter.next(), { value: 13, done: false });
    assert.deepEqual(iter.next(), { value: 14, done: false });
    assert.equal(iter.next().done, true);
  });
});
