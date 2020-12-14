import test from "ava";

import { range } from "../../index.js";
import chain from "../chain.js";

test("chain", (t) => {
  const iter = chain(range(0, 3), range(3, 6))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 3, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.deepEqual(iter.next(), { value: 5, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
