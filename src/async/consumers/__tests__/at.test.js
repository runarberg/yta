import assert from "node:assert/strict";
import test, { suite } from "node:test";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { of } from "../../index.js";
import at from "../at.js";

suite("async/consumers/at", () => {
  test("positive index", async () => {
    assert.equal(await pipe(of("foo", "bar", "baz", "quux"), at(0)), "foo");
    assert.equal(await pipe(of("foo", "bar", "baz", "quux"), at(1)), "bar");
    assert.equal(await pipe(range(10), asAsync(), at(5)), 5);
  });

  test("negative index", async () => {
    assert.equal(await pipe(of("foo", "bar", "baz", "quux"), at(-1)), "quux");
    assert.equal(await pipe(of("foo", "bar", "baz", "quux"), at(-2)), "baz");
    assert.equal(await pipe(range(10), asAsync(), at(-5)), 5);
  });

  test("out of range", async () => {
    assert.equal(await pipe(of("foo", "bar", "baz", "quux"), at(5)), undefined);
  });

  test("negative out of range", async () => {
    assert.equal(
      await pipe(of("foo", "bar", "baz", "quux"), at(-5)),
      undefined,
    );
  });

  test("at of empty", async () => {
    const result = await pipe(of(), at(0));

    assert.equal(result, undefined);
  });
});
