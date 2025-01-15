import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
import count from "../count.js";

suite("sync/consumers/count", () => {
  test("count", () => {
    assert.equal(pipe(range(4), count()), 4);
  });

  test("empty", () => {
    assert.equal(pipe(of(), count()), 0);
  });
});
