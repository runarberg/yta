import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import aside from "../aside.js";

suite("sync/operators/aside", () => {
  test("aside", () => {
    /** @type {string[][]} */
    const calls = [];

    const pipeline = pipe(
      of("a", "b", "c"),
      aside((...args) => calls.push(args)),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: "a", done: false });
    assert.deepEqual(iter.next(), { value: "b", done: false });
    assert.deepEqual(iter.next(), { value: "c", done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });

    assert.deepEqual(calls, [["a"], ["b"], ["c"]]);
  });
});
