import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import aside from "../aside.js";

suite("async/operators/aside", () => {
  test("aside", async () => {
    /** @type {string[][]} */
    const calls = [];

    const pipeline = pipe(
      of("a", "b", "c"),
      aside((...args) => calls.push(args)),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: "a", done: false });
    assert.deepEqual(await iter.next(), { value: "b", done: false });
    assert.deepEqual(await iter.next(), { value: "c", done: false });
    assert.equal((await iter.next()).done, true);

    assert.deepEqual(calls, [["a"], ["b"], ["c"]]);
  });
});
