import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import reduce from "../reduce.js";

suite("async/consumers/reduce", () => {
  test("reduce", async () => {
    const result = pipe(
      range(10),
      asAsync(),
      reduce((sum, x) => sum + x, 0),
    );

    assert.equal(result instanceof Promise, true);
    assert.equal(await result, 45);
  });
});
