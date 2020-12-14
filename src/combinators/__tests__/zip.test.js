import test from "ava";

import { flatRepeat, of, pipe, range } from "../../index.js";
import zip from "../zip.js";

test("zip", (t) => {
  const iter = zip(of("a", "b", "c"), of(1, 2, 3))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: ["a", 1], done: false });
  t.deepEqual(iter.next(), { value: ["b", 2], done: false });
  t.deepEqual(iter.next(), { value: ["c", 3], done: false });
  t.is(iter.next().done, true);
});

test("spread in a pipeline", (t) => {
  const result = pipe(
    of(
      of("a", "b", "c"),
      // @ts-ignore
      of(1, 2, 3),
    ),
    (iterables) => zip(...iterables),
    Object.fromEntries,
  );

  t.deepEqual(result, { a: 1, b: 2, c: 3 });
});

test("stops on shortest sequence", (t) => {
  const pipeline = zip(
    of("a", "b", "c"),
    range(),
    flatRepeat(() => of(true, false)),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: ["a", 0, true], done: false });
  t.deepEqual(iter.next(), { value: ["b", 1, false], done: false });
  t.deepEqual(iter.next(), { value: ["c", 2, true], done: false });
  t.is(iter.next().done, true);
});
