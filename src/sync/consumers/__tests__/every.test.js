import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import every from "../every.js";

suite("sync/consumers/every", () => {
  test("every", () => {
    const result = pipe(
      of(2, 4, 6),
      every((n) => n % 2 === 0),
    );

    assert.equal(result, true);
  });

  test("not every", () => {
    const result = pipe(
      of(2, 4, 6, 7, 8),
      every((n) => n % 2 === 0),
    );

    assert.equal(result, false);
  });

  test("empty", () => {
    const result = pipe(
      of(),
      every(() => false),
    );

    assert.equal(result, true);
  });
});
