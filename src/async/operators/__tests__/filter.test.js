import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import filter from "../filter.js";

suite("async/operators/filter", () => {
  test("filter", async () => {
    const pipeline = pipe(
      range(4),
      asAsync(),
      filter((x) => x % 2 === 0),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: 0, done: false });
    assert.deepEqual(await iter.next(), { value: 2, done: false });
    assert.equal((await iter.next()).done, true);
  });
});
