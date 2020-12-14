import test from "ava";

import { of, map, pipe, range } from "../../index.js";
import groupBy from "../group-by.js";

test("groupBy even odd", (t) => {
  const result = pipe(
    range(10),
    groupBy((n) => (n % 2 === 0 ? "even" : "odd")),
  );

  t.deepEqual(result.get("even"), [0, 2, 4, 6, 8]);
  t.deepEqual(result.get("odd"), [1, 3, 5, 7, 9]);
});

test("collect into an object", (t) => {
  const result = pipe(
    of(
      { name: "foo", value: 5 },
      { name: "foo", value: 42 },
      { name: "bar", value: 101 },
      { name: "foo", value: 13 },
      { name: "bar", value: 2 },
    ),
    groupBy(({ name }) => name),
    map(([key, values]) => [key, values.map(({ value }) => value)]),
    Object.fromEntries,
  );

  t.deepEqual(result, { foo: [5, 42, 13], bar: [101, 2] });
});
