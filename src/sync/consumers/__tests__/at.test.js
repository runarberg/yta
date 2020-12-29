import test from "ava";

import { pipe } from "../../../index.js";
import { of, range } from "../../index.js";
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

test("out of range", (t) => {
  t.is(pipe(of("foo", "bar", "baz", "quux"), at(5)), undefined);
});

test("negative out of range", (t) => {
  t.is(pipe(of("foo", "bar", "baz", "quux"), at(-5)), undefined);
});

test("at of empty", (t) => {
  const result = pipe(of(), at(0));

  t.is(result, undefined);
});
