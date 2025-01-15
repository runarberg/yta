import assert from "node:assert/strict";
import test, { suite } from "node:test";

import {
  drop,
  filter,
  map,
  range,
  recurrent,
  reduce,
  take,
  toArray,
} from "../../sync/index.js";

import pipe from "../pipe.js";

suite("extras/pipe", () => {
  test("pipe to a consumer", () => {
    const result = pipe(
      range(),
      drop(10),
      filter((x) => x % 2 === 0),
      map((x) => x * 2),
      take(5),
      reduce((sum, x) => sum + x, 0),
    );

    assert.equal(result, 140);
  });

  test("fibonacci", () => {
    const fibs = pipe(
      recurrent(([a, b]) => [b, a + b], [0, 1]),
      map(([, b]) => b),
      take(10),
      toArray(),
    );

    assert.deepEqual(fibs, [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
