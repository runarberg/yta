import test from "ava";

import { pipe } from "../../../index.js";
import { of } from "../../index.js";
import aside from "../aside.js";

test("aside", async (t) => {
  /** @type string[][] */
  const calls = [];

  const pipeline = pipe(
    of("a", "b", "c"),
    aside((...args) => calls.push(args)),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: "a", done: false });
  t.deepEqual(await iter.next(), { value: "b", done: false });
  t.deepEqual(await iter.next(), { value: "c", done: false });
  t.is((await iter.next()).done, true);

  t.deepEqual(calls, [["a"], ["b"], ["c"]]);
});
