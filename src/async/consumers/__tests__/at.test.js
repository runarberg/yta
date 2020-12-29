import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { of } from "../../index.js";
import at from "../at.js";

test("positive index", async (t) => {
  t.is(await pipe(of("foo", "bar", "baz", "quux"), at(0)), "foo");
  t.is(await pipe(of("foo", "bar", "baz", "quux"), at(1)), "bar");
  t.is(await pipe(range(10), asAsync(), at(5)), 5);
});

test("negative index", async (t) => {
  t.is(await pipe(of("foo", "bar", "baz", "quux"), at(-1)), "quux");
  t.is(await pipe(of("foo", "bar", "baz", "quux"), at(-2)), "baz");
  t.is(await pipe(range(10), asAsync(), at(-5)), 5);
});

test("out of range", async (t) => {
  t.is(await pipe(of("foo", "bar", "baz", "quux"), at(5)), undefined);
});

test("negative out of range", async (t) => {
  t.is(await pipe(of("foo", "bar", "baz", "quux"), at(-5)), undefined);
});

test("at of empty", async (t) => {
  const result = await pipe(of(), at(0));

  t.is(result, undefined);
});
