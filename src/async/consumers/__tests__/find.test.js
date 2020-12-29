import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import find from "../find.js";

test("find", async (t) => {
  const result = await pipe(
    of(
      { name: "foo", value: 5 },
      { name: "bar", value: 42 },
      { name: "baz", value: 101 },
    ),
    find(({ name }) => name === "bar"),
  );

  t.deepEqual(result, { name: "bar", value: 42 });
});

test("not found", async (t) => {
  const result = await pipe(
    of(
      { name: "foo", value: 5 },
      { name: "bar", value: 42 },
      { name: "baz", value: 101 },
    ),
    find(({ name }) => name === "quux"),
  );

  t.is(result, undefined);
});

test("empty", async (t) => {
  const result = await pipe(
    of(),
    find(() => true),
  );

  t.is(result, undefined);
});
