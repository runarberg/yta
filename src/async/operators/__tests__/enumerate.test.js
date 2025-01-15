import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import enumerate from "../enumerate.js";

suite("async/operators/enumerate", () => {
  test("enumerate", async () => {
    const pipeline = pipe(of("a", "b", "c"), enumerate());
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: [0, "a"], done: false });
    assert.deepEqual(await iter.next(), { value: [1, "b"], done: false });
    assert.deepEqual(await iter.next(), { value: [2, "c"], done: false });
    assert.equal((await iter.next()).done, true);
  });
});
