import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import asAsync from "../as-async.js";

suite("sync/operators/as-async", () => {
  test("as-async", async () => {
    const iter = pipe(range(5), asAsync())[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.equal((await iter.next()).done, true);
    assert.equal(iter.next() instanceof Promise, true);
  });
});
