import test from "ava";

import { of, pipe } from "../../index.js";
import find from "../find.js";

test("find", (t) => {
  const result = pipe(
    of(
      { name: "foo", value: 5 },
      { name: "bar", value: 42 },
      { name: "baz", value: 101 },
    ),
    find(({ name }) => name === "bar"),
  );

  t.deepEqual(result, { name: "bar", value: 42 });
});

test("not found", (t) => {
  const result = pipe(
    of(
      { name: "foo", value: 5 },
      { name: "bar", value: 42 },
      { name: "baz", value: 101 },
    ),
    find(({ name }) => name === "quux"),
  );

  t.is(result, undefined);
});

test("empty", (t) => {
  const result = pipe(
    of(),
    find(() => true),
  );

  t.is(result, undefined);
});
