import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import first from "../first.js";

test("first", async (t) => {
  const result = await pipe(of("foo", "bar", "baz", "quux"), first());

  t.is(result, "foo");
});

test("first of empty", async (t) => {
  const result = await pipe(of(), first());

  t.is(result, undefined);
});
