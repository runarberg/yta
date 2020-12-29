import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import flat from "../flat.js";

test("flat", async (t) => {
  const pipeline = pipe(of(of(0, 1, 2), of(3, 4, 5, 6), of(7, 8, 9)), flat());
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.deepEqual(await iter.next(), { value: 6, done: false });
  t.deepEqual(await iter.next(), { value: 7, done: false });
  t.deepEqual(await iter.next(), { value: 8, done: false });
  t.deepEqual(await iter.next(), { value: 9, done: false });
  t.is((await iter.next()).done, true);
});
