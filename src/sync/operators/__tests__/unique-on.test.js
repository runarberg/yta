import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../..//index.js";
import uniqueOn from "../unique-on.js";

suite("sync/operators/unique-on", () => {
  test("uniqueOn", () => {
    const pipeline = pipe(
      of(
        { id: 1, type: "a" },
        { id: 2, type: "b" },
        { id: 3, type: "a" },
        { id: 4, type: "c" },
      ),
      uniqueOn(({ type }) => type),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), {
      value: { id: 1, type: "a" },
      done: false,
    });

    assert.deepEqual(iter.next(), {
      value: { id: 2, type: "b" },
      done: false,
    });

    assert.deepEqual(iter.next(), {
      value: { id: 4, type: "c" },
      done: false,
    });

    assert.equal(iter.next().done, true);
  });
});
