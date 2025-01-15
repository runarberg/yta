import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import forEach from "../for-each.js";

suite("sync/consumers/for-each", () => {
  test("forEach", () => {
    /** @type {string[][]} */
    const calls = [];

    pipe(
      of("a", "b", "c"),
      forEach((...args) => calls.push(args)),
    );

    assert.deepEqual(calls, [["a"], ["b"], ["c"]]);
  });
});
