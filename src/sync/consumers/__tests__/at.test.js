import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
import at from "../at.js";

suite("sync/consumers/at", () => {
  test("positive index", () => {
    assert.equal(pipe(of("foo", "bar", "baz", "quux"), at(0)), "foo");
    assert.equal(pipe(of("foo", "bar", "baz", "quux"), at(1)), "bar");
    assert.equal(pipe(range(10), at(5)), 5);
  });

  test("negative index", () => {
    assert.equal(pipe(of("foo", "bar", "baz", "quux"), at(-1)), "quux");
    assert.equal(pipe(of("foo", "bar", "baz", "quux"), at(-2)), "baz");
    assert.equal(pipe(range(10), at(-5)), 5);
  });

  test("out of range", () => {
    assert.equal(pipe(of("foo", "bar", "baz", "quux"), at(5)), undefined);
  });

  test("negative out of range", () => {
    assert.equal(pipe(of("foo", "bar", "baz", "quux"), at(-5)), undefined);
  });

  test("at of empty", () => {
    const result = pipe(of(), at(0));

    assert.equal(result, undefined);
  });
});
