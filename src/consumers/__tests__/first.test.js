import test from "ava";

import { of, pipe } from "../../index.js";
import first from "../first.js";

test("first", (t) => {
  const result = pipe(of("foo", "bar", "baz", "quux"), first());

  t.is(result, "foo");
});

test("first of empty", (t) => {
  const result = pipe(of(), first());

  t.is(result, undefined);
});
