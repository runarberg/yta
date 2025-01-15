import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import includes from "../includes.js";

suite("sync/consumers/includes", () => {
  test("includes", () => {
    const result = pipe(of(1, 3, 5), includes(3));

    assert.equal(result, true);
  });

  test("does not include", () => {
    const result = pipe(of("foo", "bar", "baz"), includes("quux"));

    assert.equal(result, false);
  });

  test("empty", () => {
    const result = pipe(of(), includes(true));

    assert.equal(result, false);
  });
});
