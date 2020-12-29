import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import cycle from "../cycle.js";

test("cycle", (t) => {
  const pipeline = pipe(of(1, -1), cycle());
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: -1, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
});
