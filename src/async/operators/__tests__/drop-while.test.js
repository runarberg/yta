import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { of } from "../../index.js";
import dropWhile from "../drop-while.js";

suite("async/operators/drop-while", () => {
  test("dropWhile", async () => {
    const pipeline = pipe(
      range(10),
      asAsync(),
      dropWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.deepEqual(await iter.next(), { value: 6, done: false });
    assert.deepEqual(await iter.next(), { value: 7, done: false });
    assert.deepEqual(await iter.next(), { value: 8, done: false });
    assert.deepEqual(await iter.next(), { value: 9, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("drop all", async () => {
    const pipeline = pipe(
      range(5),
      asAsync(),
      dropWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("empty", async () => {
    const pipeline = pipe(
      of(),
      dropWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("closes child on return", async () => {
    const child = pipe(range(), asAsync());
    const pipeline = pipe(
      child,
      dropWhile((n) => n < 5),
    );
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });

    await iter.return();

    assert.equal((await child.next()).done, true);
  });

  test("closes children on throw", async () => {
    const child = pipe(range(), asAsync());
    const pipeline = pipe(
      child,
      dropWhile((n) => n < 5),
    );
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });

    await assert.rejects(() => iter.throw(new Error("BOOM")));

    assert.equal((await child.next()).done, true);
  });
});
