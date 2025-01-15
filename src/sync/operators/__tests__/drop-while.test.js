import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
import dropWhile from "../drop-while.js";

suite("sync/operators/drop-while", () => {
  test("dropWhile", () => {
    const pipeline = pipe(
      range(10),
      dropWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.deepEqual(iter.next(), { value: 6, done: false });
    assert.deepEqual(iter.next(), { value: 7, done: false });
    assert.deepEqual(iter.next(), { value: 8, done: false });
    assert.deepEqual(iter.next(), { value: 9, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });

  test("drop all", () => {
    const pipeline = pipe(
      range(5),
      dropWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });

  test("empty", () => {
    const pipeline = pipe(
      of(),
      dropWhile((n) => n < 5),
    );

    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });

  test("closes child on return", () => {
    const child = range();
    const pipeline = pipe(
      child,
      dropWhile((n) => n < 5),
    );
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });

    iter.return();

    assert.equal(child.next().done, true);
  });

  test("closes children on throw", () => {
    const child = range();
    const pipeline = pipe(
      child,
      dropWhile((n) => n < 5),
    );
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.throws(() => iter.throw(new Error("BOOM")));
    assert.equal(child.next().done, true);
  });
});
