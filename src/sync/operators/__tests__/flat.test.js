import test from "ava";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
import flat from "../flat.js";

test("flat", (t) => {
  const pipeline = pipe(of(range(0, 3), range(3, 6), range(6, 10)), flat());
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.deepEqual(iter.next(), { value: 5, done: false });
  t.deepEqual(iter.next(), { value: 6, done: false });
  t.deepEqual(iter.next(), { value: 7, done: false });
  t.deepEqual(iter.next(), { value: 8, done: false });
  t.deepEqual(iter.next(), { value: 9, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
