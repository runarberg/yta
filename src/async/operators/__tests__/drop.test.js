import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { of } from "../../index.js";
import drop from "../drop.js";

test("drop 5", async (t) => {
  const iter = pipe(range(10), asAsync(), drop(5))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.deepEqual(await iter.next(), { value: 6, done: false });
  t.deepEqual(await iter.next(), { value: 7, done: false });
  t.deepEqual(await iter.next(), { value: 8, done: false });
  t.deepEqual(await iter.next(), { value: 9, done: false });
  t.is((await iter.next()).done, true);
});

test("drop from end", async (t) => {
  const iter = pipe(range(10), asAsync(), drop(-5))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.is((await iter.next()).done, true);
});

test("drop non-devisive from end", async (t) => {
  const iter = pipe(range(10), asAsync(), drop(-4))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.is((await iter.next()).done, true);
});

test("drop more then length from end", async (t) => {
  const iter = pipe(range(5), asAsync(), drop(-15))[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("drop infinite from end", async (t) => {
  const pipeline = pipe(range(5), asAsync(), drop(Number.NEGATIVE_INFINITY));
  const iter = pipeline[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("drop all", async (t) => {
  const dropAll = drop(Number.POSITIVE_INFINITY);
  const iter = pipe(range(5), asAsync(), dropAll)[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("empty", async (t) => {
  const dropAll = drop(Number.POSITIVE_INFINITY);
  const iter = pipe(of(), dropAll)[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("drop at the end of reusible iters", async (t) => {
  const iter = pipe([0, 1, 2, 3, 4, 5, 6], asAsync(), drop(-2))[
    Symbol.asyncIterator
  ]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.is((await iter.next()).done, true);
});

test("closes child on return", async (t) => {
  const child = pipe(range(), asAsync());
  const pipeline = pipe(child, drop(5));
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 5, done: false });

  await iter.return();

  t.is((await child.next()).done, true);
});

test("closes child on return when negative", async (t) => {
  const child = pipe(range(10), asAsync());
  const pipeline = pipe(child, drop(-5));
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });

  await iter.return();

  t.is((await child.next()).done, true);
});

test("closes children on throw", async (t) => {
  const child = pipe(range(), asAsync());
  const pipeline = pipe(child, drop(5));
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 5, done: false });

  await t.throwsAsync(() => iter.throw(new Error("BOOM")));

  t.is((await child.next()).done, true);
});

test("closes children on throw when negative", async (t) => {
  const child = pipe(range(10), asAsync());
  const pipeline = pipe(child, drop(-5));
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });

  await t.throwsAsync(() => iter.throw(new Error("BOOM")));

  t.is((await child.next()).done, true);
});
