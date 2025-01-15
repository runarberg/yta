import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
import flat from "../flat.js";

suite("sync/operators/flat", () => {
  test("flat", () => {
    const pipeline = pipe(of(range(0, 3), range(3, 6), range(6, 10)), flat());
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.deepEqual(iter.next(), { value: 6, done: false });
    assert.deepEqual(iter.next(), { value: 7, done: false });
    assert.deepEqual(iter.next(), { value: 8, done: false });
    assert.deepEqual(iter.next(), { value: 9, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
