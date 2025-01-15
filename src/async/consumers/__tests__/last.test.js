import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import last from "../last.js";

suite("async/consumers/last", () => {
  test("last", async () => {
    const result = await pipe(of("foo", "bar", "baz", "quux"), last());

    assert.equal(result, "quux");
  });

  test("last of empty", async () => {
    const result = await pipe(of(), last());

    assert.equal(result, undefined);
  });
});
