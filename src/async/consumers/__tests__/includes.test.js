import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import includes from "../includes.js";

test("includes", async (t) => {
  const result = await pipe(of(1, 3, 5), includes(3));

  t.is(result, true);
});

test("does not include", async (t) => {
  const result = await pipe(of("foo", "bar", "baz"), includes("quux"));

  t.is(result, false);
});

test("empty", async (t) => {
  const result = await pipe(of(), includes(true));

  t.is(result, false);
});
