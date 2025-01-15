import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { map, of, range } from "../../index.js";
import groupBy from "../group-by.js";

suite("sync/consumers/group-by", () => {
  test("groupBy even odd", () => {
    const result = pipe(
      range(10),
      groupBy((n) => (n % 2 === 0 ? "even" : "odd")),
    );

    assert.deepEqual(result.get("even"), [0, 2, 4, 6, 8]);
    assert.deepEqual(result.get("odd"), [1, 3, 5, 7, 9]);
  });

  test("collect into an object", () => {
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

    assert.deepEqual(result, { foo: [5, 42, 13], bar: [101, 2] });
  });
});
