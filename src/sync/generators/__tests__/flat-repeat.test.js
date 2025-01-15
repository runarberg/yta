import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { of } from "../../index.js";
import flatRepeat from "../flat-repeat.js";

suite("sync/generators/flat-repeat", () => {
  test("flat repeat indefinitely", () => {
    const pipeline = flatRepeat(() => of(1, -1));
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
  });

  test("flat repeat n times", () => {
    const pipeline = flatRepeat(() => of(1, -1), 3);
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: -1, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
