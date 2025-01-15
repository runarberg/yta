import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import takeWhile from "../take-while.js";

suite("sync/operators/take-while", () => {
  test("takeWhile", () => {
    const pipeline = pipe(
      range(10),
      takeWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
