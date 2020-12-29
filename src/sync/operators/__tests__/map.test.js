import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import map from "../map.js";

test("simple map", (t) => {
  const pipeline = pipe(
    range(3),
    map((x) => x * 2),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: 4, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
