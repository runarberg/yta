import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import slice from "../slice.js";

suite("async/operators/slice", () => {
  test("empty slice", async () => {
    const iter = pipe(range(), asAsync(), slice(0, 0))[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("positive start slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(0, 5))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("positive middle slice", async () => {
    const iter = pipe(range(), asAsync(), slice(1, 6))[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("positive end slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(5))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.deepEqual(await iter.next(), { value: 6, done: false });
    assert.deepEqual(await iter.next(), { value: 7, done: false });
    assert.deepEqual(await iter.next(), { value: 8, done: false });
    assert.deepEqual(await iter.next(), { value: 9, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("negative end slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(-3))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 7, done: false });
    assert.deepEqual(await iter.next(), { value: 8, done: false });
    assert.deepEqual(await iter.next(), { value: 9, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("negative start slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(0, -7))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("negative middle slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(1, -7))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("double negative slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(-5, -2))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.deepEqual(await iter.next(), { value: 6, done: false });
    assert.deepEqual(await iter.next(), { value: 7, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("empty double negative slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(-5, -8))[
      Symbol.asyncIterator
    ]();

    assert.equal((await iter.next()).done, true);
  });

  test("negative start, positive end", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(-5, 8))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.deepEqual(await iter.next(), { value: 6, done: false });
    assert.deepEqual(await iter.next(), { value: 7, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("empty positive slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(8, 5))[
      Symbol.asyncIterator
    ]();

    assert.equal((await iter.next()).done, true);
  });

  test("empty negative slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(-5, -8))[
      Symbol.asyncIterator
    ]();

    assert.equal((await iter.next()).done, true);
  });

  test("empty negative start slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(-5, 2))[
      Symbol.asyncIterator
    ]();

    assert.equal((await iter.next()).done, true);
  });

  test("empty negative end slice", async () => {
    const iter = pipe(range(0, 10), asAsync(), slice(8, -5))[
      Symbol.asyncIterator
    ]();

    assert.equal((await iter.next()).done, true);
  });
});
