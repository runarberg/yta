import test from "ava";

import { of } from "../../index.js";
import repeat from "../repeat.js";

test("repeat indefinitely", async (t) => {
  t.plan(10);

  const pipeline = repeat(() => of(1, -1));
  const iter = pipeline[Symbol.asyncIterator]();

  for (let i = 0; i < 3; i += 1) {
    const next = await iter.next();

    if (next.done) {
      t.fail("Iterator finished early");

      return;
    }

    const inner = next.value[Symbol.asyncIterator]();

    t.deepEqual(await inner.next(), { value: 1, done: false });
    t.deepEqual(await inner.next(), { value: -1, done: false });
    t.is((await inner.next()).done, true);
  }

  t.is((await iter.next()).done, false);
});

test("repeat n times", async (t) => {
  t.plan(10);

  const pipeline = repeat(() => of(1, -1), 3);
  const iter = pipeline[Symbol.asyncIterator]();

  for (let i = 0; i < 3; i += 1) {
    const next = await iter.next();

    if (next.done) {
      t.fail("Iterator finished early");

      return;
    }

    const inner = next.value[Symbol.asyncIterator]();

    t.deepEqual(await inner.next(), { value: 1, done: false });
    t.deepEqual(await inner.next(), { value: -1, done: false });
    t.is((await inner.next()).done, true);
  }

  t.is((await iter.next()).done, true);
});
