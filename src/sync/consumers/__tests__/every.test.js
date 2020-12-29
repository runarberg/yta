import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import every from "../every.js";

test("every", (t) => {
  const result = pipe(
    of(2, 4, 6),
    every((n) => n % 2 === 0),
  );

  t.is(result, true);
});

test("not every", (t) => {
  const result = pipe(
    of(2, 4, 6, 7, 8),
    every((n) => n % 2 === 0),
  );

  t.is(result, false);
});

test("empty", (t) => {
  const result = pipe(
    of(),
    every(() => false),
  );

  t.is(result, true);
});
