import test from "ava";

import { of, pipe, range } from "../../index.js";
import dropWhile from "../drop-while.js";

test("dropWhile", (t) => {
  const pipeline = pipe(
    range(10),
    dropWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 5, done: false });
  t.deepEqual(iter.next(), { value: 6, done: false });
  t.deepEqual(iter.next(), { value: 7, done: false });
  t.deepEqual(iter.next(), { value: 8, done: false });
  t.deepEqual(iter.next(), { value: 9, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});

test("drop all", (t) => {
  const pipeline = pipe(
    range(5),
    dropWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: undefined, done: true });
});

test("empty", (t) => {
  const pipeline = pipe(
    of(),
    dropWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: undefined, done: true });
});
