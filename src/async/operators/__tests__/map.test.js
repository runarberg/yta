import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import map from "../map.js";

test("async map", async (t) => {
  const pipeline = pipe(
    range(3),
    asAsync(),
    map((x) => x * 2),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.is((await iter.next()).done, true);
});
