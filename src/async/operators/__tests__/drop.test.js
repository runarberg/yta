import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { of } from "../../index.js";
import drop from "../drop.js";

suite("async/operators/drop", () => {
  test("drop 5", async () => {
    const iter = pipe(range(10), asAsync(), drop(5))[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.deepEqual(await iter.next(), { value: 6, done: false });
    assert.deepEqual(await iter.next(), { value: 7, done: false });
    assert.deepEqual(await iter.next(), { value: 8, done: false });
    assert.deepEqual(await iter.next(), { value: 9, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("drop from end", async () => {
    const iter = pipe(range(10), asAsync(), drop(-5))[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("drop non-devisive from end", async () => {
    const iter = pipe(range(10), asAsync(), drop(-4))[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("drop more then length from end", async () => {
    const iter = pipe(range(5), asAsync(), drop(-15))[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("drop infinite from end", async () => {
    const pipeline = pipe(range(5), asAsync(), drop(Number.NEGATIVE_INFINITY));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("drop all", async () => {
    const dropAll = drop(Number.POSITIVE_INFINITY);
    const iter = pipe(range(5), asAsync(), dropAll)[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("empty", async () => {
    const dropAll = drop(Number.POSITIVE_INFINITY);
    const iter = pipe(of(), dropAll)[Symbol.asyncIterator]();

    assert.equal((await iter.next()).done, true);
  });

  test("drop at the end of reusible iters", async () => {
    const iter = pipe([0, 1, 2, 3, 4, 5, 6], asAsync(), drop(-2))[
      Symbol.asyncIterator
    ]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("closes child on return", async () => {
    const child = pipe(range(), asAsync());
    const pipeline = pipe(child, drop(5));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });

    await iter.return();

    assert.equal((await child.next()).done, true);
  });

  test("closes child on return when negative", async () => {
    const child = pipe(range(10), asAsync());
    const pipeline = pipe(child, drop(-5));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });

    await iter.return();

    assert.equal((await child.next()).done, true);
  });

  test("closes children on throw", async () => {
    const child = pipe(range(), asAsync());
    const pipeline = pipe(child, drop(5));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 5, done: false });

    await assert.rejects(() => iter.throw(new Error("BOOM")));

    assert.equal((await child.next()).done, true);
  });

  test("closes children on throw when negative", async () => {
    const child = pipe(range(10), asAsync());
    const pipeline = pipe(child, drop(-5));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });

    await assert.rejects(() => iter.throw(new Error("BOOM")));

    assert.equal((await child.next()).done, true);
  });
});
