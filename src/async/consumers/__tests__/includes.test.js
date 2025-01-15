import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import includes from "../includes.js";

suite("async/consumers/includes", () => {
  test("includes", async () => {
    const result = await pipe(of(1, 3, 5), includes(3));

    assert.equal(result, true);
  });

  test("does not include", async () => {
    const result = await pipe(of("foo", "bar", "baz"), includes("quux"));

    assert.equal(result, false);
  });

  test("empty", async () => {
    const result = await pipe(of(), includes(true));

    assert.equal(result, false);
  });
});
