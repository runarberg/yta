import test from "ava";

import { of } from "../../index.js";
import flatRepeat from "../flat-repeat.js";

test("flat repeat indefinitely", async (t) => {
  const pipeline = flatRepeat(() => of(1, -1));
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: -1, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: -1, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: -1, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
});

test("flat repeat n times", async (t) => {
  const pipeline = flatRepeat(() => of(1, -1), 3);
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: -1, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: -1, done: false });
  t.deepEqual(await iter.next(), { value: 1, done: false });
  t.deepEqual(await iter.next(), { value: -1, done: false });
  t.is((await iter.next()).done, true);
});
