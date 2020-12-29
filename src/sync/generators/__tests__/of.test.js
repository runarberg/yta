import test from "ava";

import of from "../of.js";

test("generate of", (t) => {
  const iter = of(1, 2, 3)[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});

test("empty", (t) => {
  const iter = of()[Symbol.iterator]();

  t.is(iter.next().done, true);
});
