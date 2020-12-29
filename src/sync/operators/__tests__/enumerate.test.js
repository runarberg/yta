import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import enumerate from "../enumerate.js";

test("enumerate", (t) => {
  const pipeline = pipe(of("a", "b", "c"), enumerate());
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: [0, "a"], done: false });
  t.deepEqual(iter.next(), { value: [1, "b"], done: false });
  t.deepEqual(iter.next(), { value: [2, "c"], done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });
});
