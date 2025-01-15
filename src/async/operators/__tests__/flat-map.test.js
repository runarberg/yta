import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../../sync/index.js";
import { of } from "../../index.js";
import flatMap from "../flat-map.js";

suite("async/operators/flat-map", () => {
  test("flatMap", async () => {
    const pipeline = pipe(
      of(0, 1, 2, 3),
      flatMap((n) => of(...range(n))),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 1, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.equal((await iter.next()).done, true);
  });
});
