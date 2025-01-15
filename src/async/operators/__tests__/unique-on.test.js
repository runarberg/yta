import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../..//index.js";
import uniqueOn from "../unique-on.js";

suite("async/operators/unique-on", () => {
  test("uniqueOn", async () => {
    const pipeline = pipe(
      of(
        { id: 1, type: "a" },
        { id: 2, type: "b" },
        { id: 3, type: "a" },
        { id: 4, type: "c" },
      ),
      uniqueOn(({ type }) => type),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), {
      value: { id: 1, type: "a" },
      done: false,
    });

    assert.deepEqual(await iter.next(), {
      value: { id: 2, type: "b" },
      done: false,
    });

    assert.deepEqual(await iter.next(), {
      value: { id: 4, type: "c" },
      done: false,
    });

    assert.equal((await iter.next()).done, true);
  });
});
