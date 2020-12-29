import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import take from "../take.js";

test("take 0", async (t) => {
  const iter = pipe(range(), asAsync(), take(0))[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("take 5", async (t) => {
  const iter = pipe(range(), asAsync(), take(5))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.is((await iter.next()).done, true);
});

test("take more then all", async (t) => {
  const iter = pipe(range(0, 2), asAsync(), take(5))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.is((await iter.next()).done, true);
});

test("take from end", async (t) => {
  const iter = pipe(range(0, 15), asAsync(), take(-5))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 10, done: false });
  t.deepEqual(await iter.next(), { value: 11, done: false });
  t.deepEqual(await iter.next(), { value: 12, done: false });
  t.deepEqual(await iter.next(), { value: 13, done: false });
  t.deepEqual(await iter.next(), { value: 14, done: false });
  t.is((await iter.next()).done, true);
});

test("take non-divisive from end", async (t) => {
  const iter = pipe(range(0, 15), asAsync(), take(-4))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 11, done: false });
  t.deepEqual(await iter.next(), { value: 12, done: false });
  t.deepEqual(await iter.next(), { value: 13, done: false });
  t.deepEqual(await iter.next(), { value: 14, done: false });
  t.is((await iter.next()).done, true);
});
