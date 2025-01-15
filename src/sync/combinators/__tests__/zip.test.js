import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { flatRepeat, of, range } from "../../index.js";
import zip from "../zip.js";

suite("sync/combinators/zip", () => {
  test("zip", () => {
    const iter = zip(of("a", "b", "c"), of(1, 2, 3))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: ["a", 1], done: false });
    assert.deepEqual(iter.next(), { value: ["b", 2], done: false });
    assert.deepEqual(iter.next(), { value: ["c", 3], done: false });
    assert.equal(iter.next().done, true);
  });

  test("spread in a pipeline", () => {
    const result = pipe(
      of(
        of("a", "b", "c"),
        // @ts-ignore
        of(1, 2, 3),
      ),
      (iterables) => zip(...iterables),
      Object.fromEntries,
    );

    assert.deepEqual(result, { a: 1, b: 2, c: 3 });
  });

  test("stops on shortest sequence", () => {
    const pipeline = zip(
      of("a", "b", "c"),
      range(),
      flatRepeat(() => of(true, false)),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: ["a", 0, true], done: false });
    assert.deepEqual(iter.next(), { value: ["b", 1, false], done: false });
    assert.deepEqual(iter.next(), { value: ["c", 2, true], done: false });
    assert.equal(iter.next().done, true);
  });

  test("closes when a child calls return", () => {
    const child1 = range();
    const child2 = range();
    const pipeline = zip(child1, child2);
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [0, 0], done: false });

    child1.return();

    assert.equal(iter.next().done, true);
  });

  test("closes children on return", () => {
    const child1 = range();
    const child2 = range();
    const pipeline = zip(child1, child2);
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [0, 0], done: false });

    iter.return();

    assert.equal(child1.next().done, true);
    assert.equal(child2.next().done, true);
  });

  test("closes children on throw", () => {
    const child1 = range();
    const child2 = range();
    const pipeline = zip(child1, child2);
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [0, 0], done: false });

    assert.throws(() => iter.throw(new Error("whatever")));

    assert.equal(child1.next().done, true);
    assert.equal(child2.next().done, true);
  });

  test("closes siblings when a child finishes", () => {
    const child1 = range();
    const child2 = range();
    const child3 = range(0, 1);
    const pipeline = zip(child1, child2, child3);
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: [0, 0, 0], done: false });
    assert.equal(iter.next().done, true);
    assert.equal(child1.next().done, true);
    assert.equal(child2.next().done, true);
  });
});
