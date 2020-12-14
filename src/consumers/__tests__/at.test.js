import test from "ava";

import { of, pipe, range } from "../../index.js";
import at from "../at.js";

test("positive index", (t) => {
  t.is(pipe(of("foo", "bar", "baz", "quux"), at(0)), "foo");
  t.is(pipe(of("foo", "bar", "baz", "quux"), at(1)), "bar");
  t.is(pipe(range(10), at(5)), 5);
});

test("negative index", (t) => {
  t.is(pipe(of("foo", "bar", "baz", "quux"), at(-1)), "quux");
  t.is(pipe(of("foo", "bar", "baz", "quux"), at(-2)), "baz");
  t.is(pipe(range(10), at(-5)), 5);
});

test("at of empty", (t) => {
  const result = pipe(of(), at(0));

  t.is(result, undefined);
});
