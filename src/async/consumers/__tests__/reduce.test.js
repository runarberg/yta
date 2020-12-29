import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import reduce from "../reduce.js";

test("reduce", async (t) => {
  const result = pipe(
    range(10),
    asAsync(),
    reduce((sum, x) => sum + x, 0),
  );

  t.is(result instanceof Promise, true);
  t.is(await result, 45);
});
