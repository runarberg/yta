import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import toArray from "../to-array.js";

suite("async/consumers/to-array", () => {
  test("toArray", async () => {
    const result = pipe(range(5), asAsync(), toArray());

    assert.equal(result instanceof Promise, true);
    assert.deepEqual(await result, [0, 1, 2, 3, 4]);
  });
});
