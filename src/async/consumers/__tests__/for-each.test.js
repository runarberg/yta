import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, of } from "../../../sync/index.js";
import forEach from "../for-each.js";

suite("async/consumers/for-each", () => {
  test("forEach", async () => {
    /** @type {string[][]} */
    const calls = [];
    const result = pipe(
      of("a", "b", "c"),
      asAsync(),
      forEach((...args) => calls.push(args)),
    );

    assert.equal(result instanceof Promise, true);
    assert.equal(await result, undefined);
    assert.deepEqual(calls, [["a"], ["b"], ["c"]]);
  });
});
