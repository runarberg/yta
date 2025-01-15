import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import flatMap from "../flat-map.js";

suite("sync/operators/flat-map", () => {
  test("flatMap", () => {
    const pipeline = pipe(
      range(4),
      flatMap((n) => range(n)),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
