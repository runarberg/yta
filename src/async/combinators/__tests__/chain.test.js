import test from "ava";

import { of } from "../../index.js";
import chain from "../chain.js";

test("chain", async (t) => {
  const iter = chain(of(0, 1, 2), of(3, 4, 5))[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 0, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: 2, done: false });
  t.deepEqual(await iter.next(), { value: 3, done: false });
  t.deepEqual(await iter.next(), { value: 4, done: false });
  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.is((await iter.next()).done, true);
});
