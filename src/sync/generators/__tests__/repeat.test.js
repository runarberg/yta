import test, { suite } from "node:test";

import { of } from "../../index.js";
import repeat from "../repeat.js";

suite("sync/generators/repeat", () => {
  test("repeat indefinitely", (t) => {
    t.plan(10);

    const pipeline = repeat(() => of(1, -1));
    const iter = pipeline[Symbol.iterator]();

    for (let i = 0; i < 3; i += 1) {
      const next = iter.next();

      if (next.done) {
        t.assert.fail("Iterator finished early");

        return;
      }

      const inner = next.value[Symbol.iterator]();

      t.assert.deepEqual(inner.next(), { value: 1, done: false });
      t.assert.deepEqual(inner.next(), { value: -1, done: false });
      t.assert.deepEqual(inner.next(), { value: undefined, done: true });
    }

    t.assert.equal(iter.next().done, false);
  });

  test("repeat n times", (t) => {
    t.plan(10);

    const pipeline = repeat(() => of(1, -1), 3);
    const iter = pipeline[Symbol.iterator]();

    for (let i = 0; i < 3; i += 1) {
      const next = iter.next();

      if (next.done) {
        t.assert.fail("Iterator finished early");

        return;
      }

      const inner = next.value[Symbol.iterator]();

      t.assert.deepEqual(inner.next(), { value: 1, done: false });
      t.assert.deepEqual(inner.next(), { value: -1, done: false });
      t.assert.deepEqual(inner.next(), { value: undefined, done: true });
    }

    t.assert.equal(iter.next().done, true);
  });
});
