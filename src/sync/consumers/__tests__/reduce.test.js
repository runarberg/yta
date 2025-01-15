import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import reduce from "../reduce.js";

suite("sync/consumers/reduce", () => {
  test("reduce", () => {
    const result = pipe(
      range(10),
      reduce((sum, x) => sum + x, 0),
    );

    assert.equal(result, 45);
  });
});
