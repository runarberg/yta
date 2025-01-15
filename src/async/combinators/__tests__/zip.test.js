import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { flatRepeat, of } from "../../index.js";
import zip from "../zip.js";

suite("async/combinators/zip", () => {
  test("zip", async () => {
    const pipeline = zip(of("a", "b", "c"), of(1, 2, 3));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: ["a", 1], done: false });
    assert.deepEqual(await iter.next(), { value: ["b", 2], done: false });
    assert.deepEqual(await iter.next(), { value: ["c", 3], done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("stops on shortest sequence", async () => {
    const pipeline = zip(
      of("a", "b", "c"),
      pipe(range(), asAsync()),
      flatRepeat(() => of(true, false)),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: ["a", 0, true], done: false });
    assert.deepEqual(await iter.next(), {
      value: ["b", 1, false],
      done: false,
    });
    assert.deepEqual(await iter.next(), { value: ["c", 2, true], done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("closes children on return", async () => {
    const child1 = pipe(range(), asAsync());
    const child2 = pipe(range(), asAsync());
    const pipeline = zip(child1, child2);
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: [0, 0], done: false });

    await iter.return();

    assert.equal((await child1.next()).done, true);
    assert.equal((await child2.next()).done, true);
  });

  test("closes children on throw", async () => {
    const child1 = pipe(range(), asAsync());
    const child2 = pipe(range(), asAsync());
    const pipeline = zip(child1, child2);
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: [0, 0], done: false });

    await assert.rejects(() => iter.throw(new Error("whatever")));

    assert.equal((await child1.next()).done, true);
    assert.equal((await child2.next()).done, true);
  });

  test("closes siblings when a child finishes", async () => {
    const child1 = pipe(range(), asAsync());
    const child2 = pipe(range(), asAsync());
    const child3 = of(0);
    const pipeline = zip(child1, child2, child3);
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: [0, 0, 0], done: false });
    assert.equal((await iter.next()).done, true);
    assert.equal((await child1.next()).done, true);
    assert.equal((await child2.next()).done, true);
  });
});
