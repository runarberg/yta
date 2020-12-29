import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import take from "../take.js";

test("take 0", (t) => {
  const iter = pipe(range(), take(0))[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("take 5", (t) => {
  const iter = pipe(range(), take(5))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.is(iter.next().done, true);
});

test("take more then all", (t) => {
  const iter = pipe(range(0, 2), take(5))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.is(iter.next().done, true);
});

test("take from end", (t) => {
  const iter = pipe(range(0, 15), take(-5))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 10, done: false });
  t.deepEqual(iter.next(), { value: 11, done: false });
  t.deepEqual(iter.next(), { value: 12, done: false });
  t.deepEqual(iter.next(), { value: 13, done: false });
  t.deepEqual(iter.next(), { value: 14, done: false });
  t.is(iter.next().done, true);
});

test("take non-divisive from end", (t) => {
  const iter = pipe(range(0, 15), take(-4))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 11, done: false });
  t.deepEqual(iter.next(), { value: 12, done: false });
  t.deepEqual(iter.next(), { value: 13, done: false });
  t.deepEqual(iter.next(), { value: 14, done: false });
  t.is(iter.next().done, true);
});
