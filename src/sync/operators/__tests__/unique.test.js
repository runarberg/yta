import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of } from "../..//index.js";
import unique from "../unique.js";

suite("sync/operators/unique-on", () => {
  test("uniqueOn", () => {
    const pipeline = pipe(of(1, 2, 2, 3, 4, 5, 4), unique());
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), {
      value: 1,
      done: false,
    });

    assert.deepEqual(iter.next(), {
      value: 2,
      done: false,
    });

    assert.deepEqual(iter.next(), {
      value: 3,
      done: false,
    });

    assert.deepEqual(iter.next(), {
      value: 4,
      done: false,
    });

    assert.deepEqual(iter.next(), {
      value: 5,
      done: false,
    });

    assert.equal(iter.next().done, true);
  });
});
