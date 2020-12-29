import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import reduce from "../reduce.js";

test("reduce", (t) => {
  const result = pipe(
    range(10),
    reduce((sum, x) => sum + x, 0),
  );

  t.is(result, 45);
});
