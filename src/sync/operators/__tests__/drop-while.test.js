import test from "ava";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
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

test("closes child on return", (t) => {
  const child = range();
  const pipeline = pipe(
    child,
    dropWhile((n) => n < 5),
  );
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 5, done: false });

  iter.return();

  t.is(child.next().done, true);
});

test("closes children on throw", (t) => {
  const child = range();
  const pipeline = pipe(
    child,
    dropWhile((n) => n < 5),
  );
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 5, done: false });

  t.throws(() => iter.throw(new Error("BOOM")));

  t.is(child.next().done, true);
});
