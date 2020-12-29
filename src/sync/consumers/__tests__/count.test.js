import test from "ava";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
import count from "../count.js";

test("count", (t) => {
  t.is(pipe(range(4), count()), 4);
});

test("empty", (t) => {
  t.is(pipe(of(), count()), 0);
});
