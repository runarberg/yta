import test from "ava";

import { of } from "../../index.js";
import flatRepeat from "../flat-repeat.js";

test("flat repeat indefinitely", (t) => {
  const pipeline = flatRepeat(() => of(1, -1));
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
});

test("flat repeat n times", (t) => {
  const pipeline = flatRepeat(() => of(1, -1), 3);
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
