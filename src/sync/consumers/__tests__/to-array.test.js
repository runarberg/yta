import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import toArray from "../to-array.js";

suite("sync/consumers/to-array", () => {
  test("toArray", () => {
    assert.deepEqual(pipe(range(4), toArray()), [0, 1, 2, 3]);
  });
});
