import test from "ava";

import range from "../range.js";

test("range with no args", (t) => {
  const iter = range()[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.deepEqual(iter.next(), { value: 5, done: false });
});

test("range with only one arg", (t) => {
  t.deepEqual([...range(1)], [0]);
  t.deepEqual([...range(5)], [0, 1, 2, 3, 4]);
});

test("range with start and stop", (t) => {
  t.deepEqual([...range(0, 0)], []);
  t.deepEqual([...range(0, 1)], [0]);
  t.deepEqual([...range(5, 10)], [5, 6, 7, 8, 9]);
});

test("range with start, stop, and step", (t) => {
  t.deepEqual([...range(0, 0, 0)], []);
  t.deepEqual([...range(0, 2, 2)], [0]);
  t.deepEqual([...range(5, 15, 3)], [5, 8, 11, 14]);
  t.deepEqual([...range(5, 0, -1)], [5, 4, 3, 2, 1]);
});
