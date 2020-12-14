import test from "ava";

import { pipe, range } from "../../index.js";
import takeWhile from "../take-while.js";

test("takeWhile", (t) => {
  const pipeline = pipe(
    range(10),
    takeWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
