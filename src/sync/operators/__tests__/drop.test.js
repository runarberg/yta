import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
import drop from "../drop.js";

suite("sync/operators/drop", () => {
  test("drop 5", () => {
    const iter = pipe(range(10), drop(5))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.deepEqual(iter.next(), { value: 6, done: false });
    assert.deepEqual(iter.next(), { value: 7, done: false });
    assert.deepEqual(iter.next(), { value: 8, done: false });
    assert.deepEqual(iter.next(), { value: 9, done: false });
    assert.equal(iter.next().done, true);
  });

  test("drop from end", () => {
    const iter = pipe(range(10), drop(-5))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.equal(iter.next().done, true);
  });

  test("drop non-devisive from end", () => {
    const iter = pipe(range(10), drop(-4))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.equal(iter.next().done, true);
  });

  test("drop more then length from end", () => {
    const iter = pipe(range(5), drop(-15))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("drop infinite from end", () => {
    const pipeline = pipe(range(5), drop(Number.NEGATIVE_INFINITY));
    const iter = pipeline[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("drop all", () => {
    const dropAll = drop(Number.POSITIVE_INFINITY);
    const iter = pipe(range(5), dropAll)[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("empty", () => {
    const dropAll = drop(Number.POSITIVE_INFINITY);
    const iter = pipe(of(), dropAll)[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("drop at the end of reusible iters", () => {
    const iter = pipe([0, 1, 2, 3, 4, 5, 6], drop(-2))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.equal(iter.next().done, true);
  });

  test("closes child on return", () => {
    const child = range();
    const pipeline = pipe(child, drop(5));
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });

    iter.return();

    assert.equal(child.next().done, true);
  });

  test("closes child on return when negative", () => {
    const child = range(10);
    const pipeline = pipe(child, drop(-5));
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });

    iter.return();

    assert.equal(child.next().done, true);
  });

  test("closes children on throw", () => {
    const child = range();
    const pipeline = pipe(child, drop(5));
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });

    assert.throws(() => iter.throw(new Error("BOOM")));

    assert.equal(child.next().done, true);
  });

  test("closes children on throw when negative", () => {
    const child = range(10);
    const pipeline = pipe(child, drop(-5));
    const iter = pipeline[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.throws(() => iter.throw(new Error("BOOM")));
    assert.equal(child.next().done, true);
  });
});
