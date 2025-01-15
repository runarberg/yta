import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import enumerate from "../enumerate.js";

suite("sync/operators/enumerate", () => {
  test("enumerate", () => {
    const pipeline = pipe(of("a", "b", "c"), enumerate());
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [0, "a"], done: false });
    assert.deepEqual(iter.next(), { value: [1, "b"], done: false });
    assert.deepEqual(iter.next(), { value: [2, "c"], done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
