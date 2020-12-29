import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import flatMap from "../flat-map.js";

test("flatMap", (t) => {
  const pipeline = pipe(
    range(4),
    flatMap((n) => range(n)),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 1, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
