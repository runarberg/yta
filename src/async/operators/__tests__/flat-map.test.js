import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../../sync/index.js";
import { of } from "../../index.js";
import flatMap from "../flat-map.js";

test("flatMap", async (t) => {
  const pipeline = pipe(
    of(0, 1, 2, 3),
    flatMap((n) => of(...range(n))),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.is((await iter.next()).done, true);
});
