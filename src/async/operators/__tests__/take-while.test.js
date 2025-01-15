import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import takeWhile from "../take-while.js";

suite("async/operators/take-while", () => {
  test("takeWhile", async () => {
    const pipeline = pipe(
      range(10),
      asAsync(),
      takeWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.equal((await iter.next()).done, true);
  });
});
