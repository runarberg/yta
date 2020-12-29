import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import takeWhile from "../take-while.js";

test("takeWhile", async (t) => {
  const pipeline = pipe(
    range(10),
    asAsync(),
    takeWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.is((await iter.next()).done, true);
});
