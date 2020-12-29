import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import groupBy from "../group-by.js";

test("groupBy even odd", async (t) => {
  const result = await pipe(
    of(5, 42, 101, 13, 2),
    groupBy((n) => (n % 2 === 0 ? "even" : "odd")),
    async (entries) => Object.fromEntries(await entries),
  );

  t.deepEqual(result, { odd: [5, 101, 13], even: [42, 2] });
});

test("collect into an object", async (t) => {
  const result = await pipe(
    of(
      { name: "foo", value: 5 },
      { name: "foo", value: 42 },
      { name: "bar", value: 101 },
      { name: "foo", value: 13 },
      { name: "bar", value: 2 },
    ),
    groupBy(({ name }) => name),
  );

  t.deepEqual(result.get("foo"), [
    { name: "foo", value: 5 },
    { name: "foo", value: 42 },
    { name: "foo", value: 13 },
  ]);

  t.deepEqual(result.get("bar"), [
    { name: "bar", value: 101 },
    { name: "bar", value: 2 },
  ]);
});
