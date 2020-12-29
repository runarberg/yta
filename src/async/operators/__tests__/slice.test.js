import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import slice from "../slice.js";

test("empty slice", async (t) => {
  const iter = pipe(range(), asAsync(), slice(0, 0))[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("positive start slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(0, 5))[
    Symbol.asyncIterator
  ]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.is((await iter.next()).done, true);
});

test("positive middle slice", async (t) => {
  const iter = pipe(range(), asAsync(), slice(1, 6))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.is((await iter.next()).done, true);
});

test("positive end slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(5))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.deepEqual(await iter.next(), { value: 6, done: false });
  t.deepEqual(await iter.next(), { value: 7, done: false });
  t.deepEqual(await iter.next(), { value: 8, done: false });
  t.deepEqual(await iter.next(), { value: 9, done: false });
  t.is((await iter.next()).done, true);
});

test("negative end slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(-3))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 7, done: false });
  t.deepEqual(await iter.next(), { value: 8, done: false });
  t.deepEqual(await iter.next(), { value: 9, done: false });
  t.is((await iter.next()).done, true);
});

test("negative start slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(0, -7))[
    Symbol.asyncIterator
  ]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.is((await iter.next()).done, true);
});

test("negative middle slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(1, -7))[
    Symbol.asyncIterator
  ]();

  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.is((await iter.next()).done, true);
});

test("double negative slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(-5, -2))[
    Symbol.asyncIterator
  ]();

  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.deepEqual(await iter.next(), { value: 6, done: false });
  t.deepEqual(await iter.next(), { value: 7, done: false });
  t.is((await iter.next()).done, true);
});

test("empty double negative slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(-5, -8))[
    Symbol.asyncIterator
  ]();

  t.is((await iter.next()).done, true);
});

test("negative start, positive end", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(-5, 8))[
    Symbol.asyncIterator
  ]();

  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.deepEqual(await iter.next(), { value: 6, done: false });
  t.deepEqual(await iter.next(), { value: 7, done: false });
  t.is((await iter.next()).done, true);
});

test("empty positive slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(8, 5))[
    Symbol.asyncIterator
  ]();

  t.is((await iter.next()).done, true);
});

test("empty negative slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(-5, -8))[
    Symbol.asyncIterator
  ]();

  t.is((await iter.next()).done, true);
});

test("empty negative start slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(-5, 2))[
    Symbol.asyncIterator
  ]();

  t.is((await iter.next()).done, true);
});

test("empty negative end slice", async (t) => {
  const iter = pipe(range(0, 10), asAsync(), slice(8, -5))[
    Symbol.asyncIterator
  ]();

  t.is((await iter.next()).done, true);
});
