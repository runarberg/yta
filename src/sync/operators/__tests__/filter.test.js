import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import filter from "../filter.js";

suite("sync/operators/filter", () => {
  test("filter", () => {
    const pipeline = pipe(
      range(4),
      filter((x) => x % 2 === 0),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
