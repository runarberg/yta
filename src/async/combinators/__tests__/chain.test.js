import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { of } from "../../index.js";
import chain from "../chain.js";

suite("async/combinators/chain", () => {
  test("chain", async () => {
    const iter = chain(of(0, 1, 2), of(3, 4, 5))[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.deepEqual(await iter.next(), { value: 3, done: false });
    assert.deepEqual(await iter.next(), { value: 4, done: false });
    assert.deepEqual(await iter.next(), { value: 5, done: false });
    assert.equal((await iter.next()).done, true);
  });
});
