import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import last from "../last.js";

test("last", (t) => {
  const result = pipe(of("foo", "bar", "baz", "quux"), last());

  t.is(result, "quux");
});

test("last of empty", (t) => {
  const result = pipe(of(), last());

  t.is(result, undefined);
});
