import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import some from "../some.js";

test("not some", (t) => {
  const result = pipe(
    of(1, 3, 5),
    some((n) => n % 2 === 0),
  );

  t.is(result, false);
});

test("some", (t) => {
  const result = pipe(
    of("foo", "bar", "baz"),
    some((str) => str.startsWith("b")),
  );

  t.is(result, true);
});

test("empty", (t) => {
  const result = pipe(
    of(),
    some(() => true),
  );

  t.is(result, false);
});
