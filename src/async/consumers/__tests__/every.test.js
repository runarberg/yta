import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import every from "../every.js";

suite("async/consumers/every", () => {
  test("every", async () => {
    const result = await pipe(
      of(2, 4, 6),
      every((n) => n % 2 === 0),
    );

    assert.equal(result, true);
  });

  test("not every", async () => {
    const result = await pipe(
      of(2, 4, 6, 7, 8),
      every((n) => n % 2 === 0),
    );

    assert.equal(result, false);
  });

  test("empty", async () => {
    const result = await pipe(
      of(),
      every(() => false),
    );

    assert.equal(result, true);
  });
});
