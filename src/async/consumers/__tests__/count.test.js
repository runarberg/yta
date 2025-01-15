import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import count from "../count.js";

suite("async/consumers/count", () => {
  test("count", async () => {
    assert.equal(await pipe(of("a", "b", "c", "d"), count()), 4);
  });

  test("empty", async () => {
    assert.equal(await pipe(of(), count()), 0);
  });
});
