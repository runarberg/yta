import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import toArray from "../to-array.js";

test("toArray", (t) => {
  t.deepEqual(pipe(range(4), toArray()), [0, 1, 2, 3]);
});
