import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import take from "../take.js";

suite("async/operators/take", () => {
  test("take 0", async () => {
    const iter = pipe(range(), asAsync(), take(0))[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("take 5", async () => {
    const iter = pipe(range(), asAsync(), take(5))[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("take more then all", async () => {
    const iter = pipe(range(0, 2), asAsync(), take(5))[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("take from end", async () => {
    const iter = pipe(range(0, 15), asAsync(), take(-5))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 10, done: false });
    assert.deepEqual(await iter.next(), { value: 11, done: false });
    assert.deepEqual(await iter.next(), { value: 12, done: false });
    assert.deepEqual(await iter.next(), { value: 13, done: false });
    assert.deepEqual(await iter.next(), { value: 14, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("take non-divisive from end", async () => {
    const iter = pipe(range(0, 15), asAsync(), take(-4))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 11, done: false });
    assert.deepEqual(await iter.next(), { value: 12, done: false });
    assert.deepEqual(await iter.next(), { value: 13, done: false });
    assert.deepEqual(await iter.next(), { value: 14, done: false });
    assert.equal((await iter.next()).done, true);
  });
});
