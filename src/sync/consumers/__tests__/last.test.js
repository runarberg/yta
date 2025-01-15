import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import last from "../last.js";

suite("sync/consumers/last", () => {
  test("last", () => {
    const result = pipe(of("foo", "bar", "baz", "quux"), last());

    assert.equal(result, "quux");
  });

  test("last of empty", () => {
    const result = pipe(of(), last());

    assert.equal(result, undefined);
  });
});
