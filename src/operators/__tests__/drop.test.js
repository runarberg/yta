import test from "ava";

import { of, pipe, range } from "../../index.js";
import drop from "../drop.js";

test("drop 5", (t) => {
  const iter = pipe(range(10), drop(5))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 5, done: false });
  t.deepEqual(iter.next(), { value: 6, done: false });
  t.deepEqual(iter.next(), { value: 7, done: false });
  t.deepEqual(iter.next(), { value: 8, done: false });
  t.deepEqual(iter.next(), { value: 9, done: false });
  t.is(iter.next().done, true);
});

test("drop from end", (t) => {
  const iter = pipe(range(10), drop(-5))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.is(iter.next().done, true);
});

test("drop non-devisive from end", (t) => {
  const iter = pipe(range(10), drop(-4))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.deepEqual(iter.next(), { value: 5, done: false });
  t.is(iter.next().done, true);
});

test("drop more then length from end", (t) => {
  const iter = pipe(range(5), drop(-15))[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("drop infinite from end", (t) => {
  const pipeline = pipe(range(5), drop(Number.NEGATIVE_INFINITY));
  const iter = pipeline[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("drop all", (t) => {
  const dropAll = drop(Number.POSITIVE_INFINITY);
  const iter = pipe(range(5), dropAll)[Symbol.iterator]();

  t.is(iter.next().done, true);
});

test("empty", (t) => {
  const dropAll = drop(Number.POSITIVE_INFINITY);
  const iter = pipe(of(), dropAll)[Symbol.iterator]();

  t.is(iter.next().done, true);
});
