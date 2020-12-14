import test from "ava";

import { pipe, range } from "../../index.js";
import count from "../count.js";

test("count", (t) => {
  t.is(pipe(range(4), count()), 4);
});
