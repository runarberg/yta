import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { drop, range } from "../../index.js";
import accumulate from "../accumulate.js";

suite("sync/operators/accumulate", () => {
  test("accumulate into pairs", () => {
    const pipeline = pipe(
      range(1, 6),
      accumulate(([, last], current) => [last, current], [0, 0]),
      drop(1),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [1, 2], done: false });
    assert.deepEqual(iter.next(), { value: [2, 3], done: false });
    assert.deepEqual(iter.next(), { value: [3, 4], done: false });
    assert.deepEqual(iter.next(), { value: [4, 5], done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });

  test("cumsum", () => {
    const pipeline = pipe(
      range(1, 6),
      accumulate((sum, item) => sum + item, 0),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 6, done: false });
    assert.deepEqual(iter.next(), { value: 10, done: false });
    assert.deepEqual(iter.next(), { value: 15, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });

  test("cumsum pairs", () => {
    const pipeline = pipe(
      range(1, 6),
      accumulate(([, sum], item) => [item, sum + item], [0, 0]),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [1, 1], done: false });
    assert.deepEqual(iter.next(), { value: [2, 3], done: false });
    assert.deepEqual(iter.next(), { value: [3, 6], done: false });
    assert.deepEqual(iter.next(), { value: [4, 10], done: false });
    assert.deepEqual(iter.next(), { value: [5, 15], done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
