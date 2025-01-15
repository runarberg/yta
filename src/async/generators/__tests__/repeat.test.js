import test, { suite } from "node:test";

import { of } from "../../index.js";
import repeat from "../repeat.js";

suite("async/generators/repeat", () => {
  test("repeat indefinitely", async (t) => {
    t.plan(10);

    const pipeline = repeat(() => of(1, -1));
    const iter = pipeline[Symbol.asyncIterator]();

    for (let i = 0; i < 3; i += 1) {
      const next = await iter.next();

      if (next.done) {
        t.assert.fail("Iterator finished early");

        return;
      }

      const inner = next.value[Symbol.asyncIterator]();

      t.assert.deepEqual(await inner.next(), { value: 1, done: false });
      t.assert.deepEqual(await inner.next(), { value: -1, done: false });
      t.assert.equal((await inner.next()).done, true);
    }

    t.assert.equal((await iter.next()).done, false);
  });

  test("repeat n times", async (t) => {
    t.plan(10);

    const pipeline = repeat(() => of(1, -1), 3);
    const iter = pipeline[Symbol.asyncIterator]();

    for (let i = 0; i < 3; i += 1) {
      const next = await iter.next();

      if (next.done) {
        t.assert.fail("Iterator finished early");

        return;
      }

      const inner = next.value[Symbol.asyncIterator]();

      t.assert.deepEqual(await inner.next(), { value: 1, done: false });
      t.assert.deepEqual(await inner.next(), { value: -1, done: false });
      t.assert.equal((await inner.next()).done, true);
    }

    t.assert.equal((await iter.next()).done, true);
  });
});
