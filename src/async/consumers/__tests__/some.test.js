import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import some from "../some.js";

suite("async/consumers/some", () => {
  test("not some", async () => {
    const result = await pipe(
      of(1, 3, 5),
      some((n) => n % 2 === 0),
    );

    assert.equal(result, false);
  });

  test("some", async () => {
    const result = await pipe(
      of("foo", "bar", "baz"),
      some((str) => str.startsWith("b")),
    );

    assert.equal(result, true);
  });

  test("empty", async () => {
    const result = await pipe(
      of(),
      some(() => true),
    );

    assert.equal(result, false);
  });
});
