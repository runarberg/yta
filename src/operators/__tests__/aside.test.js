import test from "ava";

import { of, pipe } from "../../index.js";
import aside from "../aside.js";

test("aside", (t) => {
  /** @type string[][] */
  const calls = [];

  const pipeline = pipe(
    of("a", "b", "c"),
    aside((...args) => calls.push(args)),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: "a", done: false });
  t.deepEqual(iter.next(), { value: "b", done: false });
  t.deepEqual(iter.next(), { value: "c", done: false });
  t.deepEqual(iter.next(), { value: undefined, done: true });

  t.deepEqual(calls, [["a"], ["b"], ["c"]]);
});
