import test from "ava";

import { flatRepeat, of, pipe, range, take } from "../../index.js";
import zipLongest from "../zip-longest.js";

test("zipLongest", (t) => {
  const iter = zipLongest(of("a", "b", "c"), of(1, 2, 3))[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: ["a", 1], done: false });
  t.deepEqual(iter.next(), { value: ["b", 2], done: false });
  t.deepEqual(iter.next(), { value: ["c", 3], done: false });
  t.is(iter.next().done, true);
});

test("stops on longest sequence", (t) => {
  const pipeline = zipLongest(
    of("a", "b"),
    range(5),
    pipe(
      flatRepeat(() => of(true, false)),
      take(3),
    ),
  );

  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: ["a", 0, true], done: false });
  t.deepEqual(iter.next(), { value: ["b", 1, false], done: false });
  t.deepEqual(iter.next(), { value: [undefined, 2, true], done: false });
  t.deepEqual(iter.next(), { value: [undefined, 3, undefined], done: false });
  t.deepEqual(iter.next(), { value: [undefined, 4, undefined], done: false });
  t.is(iter.next().done, true);
});
