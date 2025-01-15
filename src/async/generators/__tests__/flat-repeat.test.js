import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { of } from "../../index.js";
import flatRepeat from "../flat-repeat.js";

suite("async/generators/flat-repeat", () => {
  test("flat repeat indefinitely", async () => {
    const pipeline = flatRepeat(() => of(1, -1));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: -1, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: -1, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: -1, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
  });

  test("flat repeat n times", async () => {
    const pipeline = flatRepeat(() => of(1, -1), 3);
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: -1, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: -1, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: -1, done: false });
    assert.equal((await iter.next()).done, true);
  });
});
