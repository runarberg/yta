import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import count from "../count.js";

test("count", async (t) => {
  t.is(await pipe(of("a", "b", "c", "d"), count()), 4);
});

test("empty", async (t) => {
  t.is(await pipe(of(), count()), 0);
});
