import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { flatRepeat, of, range, take } from "../../index.js";
import zipLongest from "../zip-longest.js";

suite("sync/combinators/zip-longest", () => {
  test("zipLongest", () => {
    const iter = zipLongest(of("a", "b", "c"), of(1, 2, 3))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: ["a", 1], done: false });
    assert.deepEqual(iter.next(), { value: ["b", 2], done: false });
    assert.deepEqual(iter.next(), { value: ["c", 3], done: false });
    assert.equal(iter.next().done, true);
  });

  test("stops on longest sequence", () => {
    const pipeline = zipLongest(
      of("a", "b"),
      range(5),
      pipe(
        flatRepeat(() => of(true, false)),
        take(3),
      ),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: ["a", 0, true], done: false });
    assert.deepEqual(iter.next(), { value: ["b", 1, false], done: false });
    assert.deepEqual(iter.next(), { value: [undefined, 2, true], done: false });
    assert.deepEqual(iter.next(), {
      value: [undefined, 3, undefined],
      done: false,
    });
    assert.deepEqual(iter.next(), {
      value: [undefined, 4, undefined],
      done: false,
    });
    assert.equal(iter.next().done, true);
  });

  test("closes children on return", () => {
    const child1 = range();
    const child2 = range();
    const pipeline = zipLongest(child1, child2);
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [0, 0], done: false });

    iter.return();

    assert.equal(child1.next().done, true);
    assert.equal(child2.next().done, true);
  });

  test("closes children on throw", () => {
    const child1 = range();
    const child2 = range();
    const pipeline = zipLongest(child1, child2);
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [0, 0], done: false });
    assert.throws(() => iter.throw(new Error("whatever")));

    assert.equal(child1.next().done, true);
    assert.equal(child2.next().done, true);
  });
});
