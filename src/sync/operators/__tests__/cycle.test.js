import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import cycle from "../cycle.js";

suite("sync/operators/cycle", () => {
  test("cycle", () => {
    const pipeline = pipe(of(1, -1), cycle());
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
  });
});
