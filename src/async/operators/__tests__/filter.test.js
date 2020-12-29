import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import filter from "../filter.js";

test("async filter", async (t) => {
  const pipeline = pipe(
    range(4),
    asAsync(),
    filter((x) => x % 2 === 0),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.is((await iter.next()).done, true);
});
