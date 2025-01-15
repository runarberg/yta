import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import first from "../first.js";

suite("async/consumers/first", () => {
  test("first", async () => {
    const result = await pipe(of("foo", "bar", "baz", "quux"), first());

    assert.equal(result, "foo");
  });

  test("first of empty", async () => {
    const result = await pipe(of(), first());

    assert.equal(result, undefined);
  });
});
