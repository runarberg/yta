import test from "ava";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import asAsync from "../as-async.js";

test("as-async", async (t) => {
  const iter = pipe(range(5), asAsync())[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.is((await iter.next()).done, true);
  t.is(iter.next() instanceof Promise, true);
});
