import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { flatRepeat, of, take } from "../../index.js";
import zipLongest from "../zip-longest.js";

test("zipLongest", async (t) => {
  const pipeline = zipLongest(of("a", "b", "c"), of(1, 2, 3));
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: ["a", 1], done: false });
  t.deepEqual(await iter.next(), { value: ["b", 2], done: false });
  t.deepEqual(await iter.next(), { value: ["c", 3], done: false });
  t.is((await iter.next()).done, true);
});

test("stops on longest sequence", async (t) => {
  const pipeline = zipLongest(
    of("a", "b"),
    pipe(range(5), asAsync()),
    pipe(
      flatRepeat(() => of(true, false)),
      take(3),
    ),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: ["a", 0, true], done: false });
  t.deepEqual(await iter.next(), { value: ["b", 1, false], done: false });
  t.deepEqual(await iter.next(), { value: [undefined, 2, true], done: false });
  t.deepEqual(await iter.next(), {
    value: [undefined, 3, undefined],
    done: false,
  });
  t.deepEqual(await iter.next(), {
    value: [undefined, 4, undefined],
    done: false,
  });
  t.is((await iter.next()).done, true);
});

test("closes children on return", async (t) => {
  const child1 = pipe(range(), asAsync());
  const child2 = pipe(range(), asAsync());
  const pipeline = zipLongest(child1, child2);
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: [0, 0], done: false });

  await iter.return();

  t.is((await child1.next()).done, true);
  t.is((await child2.next()).done, true);
});

test("closes children on throw", async (t) => {
  const child1 = pipe(range(), asAsync());
  const child2 = pipe(range(), asAsync());
  const pipeline = zipLongest(child1, child2);
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: [0, 0], done: false });

  await t.throwsAsync(() => iter.throw(new Error("whatever")));

  t.is((await child1.next()).done, true);
  t.is((await child2.next()).done, true);
});
