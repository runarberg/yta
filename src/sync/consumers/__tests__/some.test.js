import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import some from "../some.js";

suite("sync/consumers/some", () => {
  test("not some", () => {
    const result = pipe(
      of(1, 3, 5),
      some((n) => n % 2 === 0),
    );

    assert.equal(result, false);
  });

  test("some", () => {
    const result = pipe(
      of("foo", "bar", "baz"),
      some((str) => str.startsWith("b")),
    );

    assert.equal(result, true);
  });

  test("empty", () => {
    const result = pipe(
      of(),
      some(() => true),
    );

    assert.equal(result, false);
  });
});
