import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import find from "../find.js";

suite("sync/consumers/find", () => {
  test("find", () => {
    const result = pipe(
      of(
        { name: "foo", value: 5 },
        { name: "bar", value: 42 },
        { name: "baz", value: 101 },
      ),
      find(({ name }) => name === "bar"),
    );

    assert.deepEqual(result, { name: "bar", value: 42 });
  });

  test("not found", () => {
    const result = pipe(
      of(
        { name: "foo", value: 5 },
        { name: "bar", value: 42 },
        { name: "baz", value: 101 },
      ),
      find(({ name }) => name === "quux"),
    );

    assert.equal(result, undefined);
  });

  test("empty", () => {
    const result = pipe(
      of(),
      find(() => true),
    );

    assert.equal(result, undefined);
  });
});
