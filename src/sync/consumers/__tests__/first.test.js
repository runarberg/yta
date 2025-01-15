import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import first from "../first.js";

suite("sync/consumers/first", () => {
  test("first", () => {
    const result = pipe(of("foo", "bar", "baz", "quux"), first());

    assert.equal(result, "foo");
  });

  test("first of empty", () => {
    const result = pipe(of(), first());

    assert.equal(result, undefined);
  });
});
