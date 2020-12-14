import test from "ava";

import { pipe, range } from "../../index.js";
import slice from "../slice.js";

test("empty slice", (t) => {
  const iter = pipe(range(), slice(0, 0))[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("positive start slice", (t) => {
  const iter = pipe(range(0, 10), slice(0, 5))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.is(iter.next().done, true);
});

test("positive middle slice", (t) => {
  const iter = pipe(range(), slice(1, 6))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.deepEqual(iter.next(), { value: 5, done: false });
  t.is(iter.next().done, true);
});

test("positive end slice", (t) => {
  const iter = pipe(range(0, 10), slice(5))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 5, done: false });
  t.deepEqual(iter.next(), { value: 6, done: false });
  t.deepEqual(iter.next(), { value: 7, done: false });
  t.deepEqual(iter.next(), { value: 8, done: false });
  t.deepEqual(iter.next(), { value: 9, done: false });
  t.is(iter.next().done, true);
});

test("negative end slice", (t) => {
  const iter = pipe(range(0, 10), slice(-3))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 7, done: false });
  t.deepEqual(iter.next(), { value: 8, done: false });
  t.deepEqual(iter.next(), { value: 9, done: false });
  t.is(iter.next().done, true);
});

test("negative start slice", (t) => {
  const iter = pipe(range(0, 10), slice(0, -7))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.is(iter.next().done, true);
});

test("negative middle slice", (t) => {
  const iter = pipe(range(0, 10), slice(1, -7))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.is(iter.next().done, true);
});

test("double negative slice", (t) => {
  const iter = pipe(range(0, 10), slice(-5, -2))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 5, done: false });
  t.deepEqual(iter.next(), { value: 6, done: false });
  t.deepEqual(iter.next(), { value: 7, done: false });
  t.is(iter.next().done, true);
});

test("empty double negative slice", (t) => {
  const iter = pipe(range(0, 10), slice(-5, -8))[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("negative start, positive end", (t) => {
  const iter = pipe(range(0, 10), slice(-5, 8))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 5, done: false });
  t.deepEqual(iter.next(), { value: 6, done: false });
  t.deepEqual(iter.next(), { value: 7, done: false });
  t.is(iter.next().done, true);
});

test("empty positive slice", (t) => {
  const iter = pipe(range(0, 10), slice(8, 5))[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("empty negative slice", (t) => {
  const iter = pipe(range(0, 10), slice(-5, -8))[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("empty negative start slice", (t) => {
  const iter = pipe(range(0, 10), slice(-5, 2))[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("empty negative end slice", (t) => {
  const iter = pipe(range(0, 10), slice(8, -5))[Symbol.iterator]();

  t.is(iter.next().done, true);
});
