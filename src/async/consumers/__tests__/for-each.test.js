import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, of } from "../../../sync/index.js";
import forEach from "../for-each.js";

test("forEach", async (t) => {
  /** @type string[][] */
  const calls = [];
  const result = pipe(
    of("a", "b", "c"),
    asAsync(),
    forEach((...args) => calls.push(args)),
  );

  t.is(result instanceof Promise, true);
  t.is(await result, undefined);
  t.deepEqual(calls, [["a"], ["b"], ["c"]]);
});
