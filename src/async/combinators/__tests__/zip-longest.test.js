import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { flatRepeat, of, take } from "../../index.js";
import zipLongest from "../zip-longest.js";

suite("async/combinators/zip-longest", () => {
  test("zipLongest", async () => {
    const pipeline = zipLongest(of("a", "b", "c"), of(1, 2, 3));
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: ["a", 1], done: false });
    assert.deepEqual(await iter.next(), { value: ["b", 2], done: false });
    assert.deepEqual(await iter.next(), { value: ["c", 3], done: false });
    assert.equal((await iter.next()).done, true);
  });

  test("stops on longest sequence", async () => {
    const pipeline = zipLongest(
      of("a", "b"),
      pipe(range(5), asAsync()),
      pipe(
        flatRepeat(() => of(true, false)),
        take(3),
      ),
    );

    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: ["a", 0, true], done: false });
    assert.deepEqual(await iter.next(), {
      value: ["b", 1, false],
      done: false,
    });
    assert.deepEqual(await iter.next(), {
      value: [undefined, 2, true],
      done: false,
    });
    assert.deepEqual(await iter.next(), {
      value: [undefined, 3, undefined],
      done: false,
    });
    assert.deepEqual(await iter.next(), {
      value: [undefined, 4, undefined],
      done: false,
    });
    assert.equal((await iter.next()).done, true);
  });

  test("closes children on return", async () => {
    const child1 = pipe(range(), asAsync());
    const child2 = pipe(range(), asAsync());
    const pipeline = zipLongest(child1, child2);
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: [0, 0], done: false });

    await iter.return();

    assert.equal((await child1.next()).done, true);
    assert.equal((await child2.next()).done, true);
  });

  test("closes children on throw", async () => {
    const child1 = pipe(range(), asAsync());
    const child2 = pipe(range(), asAsync());
    const pipeline = zipLongest(child1, child2);
    const iter = pipeline[Symbol.asyncIterator]();

    assert.deepEqual(await iter.next(), { value: [0, 0], done: false });

    await assert.rejects(() => iter.throw(new Error("whatever")));

    assert.equal((await child1.next()).done, true);
    assert.equal((await child2.next()).done, true);
  });
});
