import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import toArray from "../to-array.js";

test("async toArray", async (t) => {
  const result = pipe(range(5), asAsync(), toArray());

  t.is(result instanceof Promise, true);
  t.deepEqual(await result, [0, 1, 2, 3, 4]);
});
