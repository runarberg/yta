import assert from "node:assert/strict";
import test, { suite } from "node:test";

import recurrent from "../recurrent.js";

suite("async/generators/recurrent", () => {
  test("fibonacci", async () => {
    const generator = recurrent(([a, b]) => [b, a + b], [0, 1]);
    const iter = generator[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: [0, 1], done: false });
    assert.deepEqual(await iter.next(), { value: [1, 1], done: false });
    assert.deepEqual(await iter.next(), { value: [1, 2], done: false });
    assert.deepEqual(await iter.next(), { value: [2, 3], done: false });
    assert.deepEqual(await iter.next(), { value: [3, 5], done: false });
    assert.deepEqual(await iter.next(), { value: [5, 8], done: false });
    assert.deepEqual(await iter.next(), { value: [8, 13], done: false });
  });
});
