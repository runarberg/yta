import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import filter from "../filter.js";

test("filter", (t) => {
  const pipeline = pipe(
    range(4),
    filter((x) => x % 2 === 0),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: 0, done: false });
  t.deepEqual(iter.next(), { value: 2, done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
