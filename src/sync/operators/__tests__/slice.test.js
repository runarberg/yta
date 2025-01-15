import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { range } from "../../index.js";
import slice from "../slice.js";

suite("sync/operators/slice", () => {
  test("empty slice", () => {
    const iter = pipe(range(), slice(0, 0))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("positive start slice", () => {
    const iter = pipe(range(0, 10), slice(0, 5))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.equal(iter.next().done, true);
  });

  test("positive middle slice", () => {
    const iter = pipe(range(), slice(1, 6))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: 4, done: false });
    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.equal(iter.next().done, true);
  });

  test("positive end slice", () => {
    const iter = pipe(range(0, 10), slice(5))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.deepEqual(iter.next(), { value: 6, done: false });
    assert.deepEqual(iter.next(), { value: 7, done: false });
    assert.deepEqual(iter.next(), { value: 8, done: false });
    assert.deepEqual(iter.next(), { value: 9, done: false });
    assert.equal(iter.next().done, true);
  });

  test("negative end slice", () => {
    const iter = pipe(range(0, 10), slice(-3))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 7, done: false });
    assert.deepEqual(iter.next(), { value: 8, done: false });
    assert.deepEqual(iter.next(), { value: 9, done: false });
    assert.equal(iter.next().done, true);
  });

  test("negative start slice", () => {
    const iter = pipe(range(0, 10), slice(0, -7))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.equal(iter.next().done, true);
  });

  test("negative middle slice", () => {
    const iter = pipe(range(0, 10), slice(1, -7))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.equal(iter.next().done, true);
  });

  test("double negative slice", () => {
    const iter = pipe(range(0, 10), slice(-5, -2))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.deepEqual(iter.next(), { value: 6, done: false });
    assert.deepEqual(iter.next(), { value: 7, done: false });
    assert.equal(iter.next().done, true);
  });

  test("empty double negative slice", () => {
    const iter = pipe(range(0, 10), slice(-5, -8))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("negative start, positive end", () => {
    const iter = pipe(range(0, 10), slice(-5, 8))[Symbol.iterator]();

    assert.deepEqual(iter.next(), { value: 5, done: false });
    assert.deepEqual(iter.next(), { value: 6, done: false });
    assert.deepEqual(iter.next(), { value: 7, done: false });
    assert.equal(iter.next().done, true);
  });

  test("empty positive slice", () => {
    const iter = pipe(range(0, 10), slice(8, 5))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("empty negative slice", () => {
    const iter = pipe(range(0, 10), slice(-5, -8))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("empty negative start slice", () => {
    const iter = pipe(range(0, 10), slice(-5, 2))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });

  test("empty negative end slice", () => {
    const iter = pipe(range(0, 10), slice(8, -5))[Symbol.iterator]();

    assert.equal(iter.next().done, true);
  });
});
