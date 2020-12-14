import test from "ava";

import { of, pipe } from "../../index.js";
import includes from "../includes.js";

test("includes", (t) => {
  const result = pipe(of(1, 3, 5), includes(3));

  t.is(result, true);
});

test("does not include", (t) => {
  const result = pipe(of("foo", "bar", "baz"), includes("quux"));

  t.is(result, false);
});

test("empty", (t) => {
  const result = pipe(of(), includes(true));

  t.is(result, false);
});
