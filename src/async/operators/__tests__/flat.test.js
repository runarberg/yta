import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import flat from "../flat.js";

suite("async/operators/flat", () => {
  test("flat", async () => {
    const pipeline = pipe(of(of(0, 1, 2), of(3, 4, 5, 6), of(7, 8, 9)), flat());
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.deepEqual(await iter.next(), { value: 6, done: false });
    assert.deepEqual(await iter.next(), { value: 7, done: false });
    assert.deepEqual(await iter.next(), { value: 8, done: false });
    assert.deepEqual(await iter.next(), { value: 9, done: false });
    assert.equal((await iter.next()).done, true);
  });
});
