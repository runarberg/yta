import test from "ava";

import { pipe } from "../../../index.js";
import { flatRepeat, of, range } from "../../index.js";
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

test("closes when a child calls return", (t) => {
  const child1 = range();
  const child2 = range();
  const pipeline = zip(child1, child2);
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: [0, 0], done: false });

  child1.return();

  t.is(iter.next().done, true);
});

test("closes children on return", (t) => {
  const child1 = range();
  const child2 = range();
  const pipeline = zip(child1, child2);
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: [0, 0], done: false });

  iter.return();

  t.is(child1.next().done, true);
  t.is(child2.next().done, true);
});

test("closes children on throw", (t) => {
  const child1 = range();
  const child2 = range();
  const pipeline = zip(child1, child2);
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: [0, 0], done: false });

  t.throws(() => iter.throw(new Error("whatever")));

  t.is(child1.next().done, true);
  t.is(child2.next().done, true);
});

test("closes siblings when a child finishes", (t) => {
  const child1 = range();
  const child2 = range();
  const child3 = range(0, 1);
  const pipeline = zip(child1, child2, child3);
  const iter = pipeline[Symbol.iterator]();

  t.deepEqual(iter.next(), { value: [0, 0, 0], done: false });
  t.is(iter.next().done, true);
  t.is(child1.next().done, true);
  t.is(child2.next().done, true);
});
