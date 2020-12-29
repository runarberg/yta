import test from "ava";

import { pipe } from "../../../index.js";
import { asAsync, range } from "../../../sync/index.js";
import { of } from "../../index.js";
import dropWhile from "../drop-while.js";

test("dropWhile", async (t) => {
  const pipeline = pipe(
    range(10),
    asAsync(),
    dropWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 5, done: false });
  t.deepEqual(await iter.next(), { value: 6, done: false });
  t.deepEqual(await iter.next(), { value: 7, done: false });
  t.deepEqual(await iter.next(), { value: 8, done: false });
  t.deepEqual(await iter.next(), { value: 9, done: false });
  t.is((await iter.next()).done, true);
});

test("drop all", async (t) => {
  const pipeline = pipe(
    range(5),
    asAsync(),
    dropWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("empty", async (t) => {
  const pipeline = pipe(
    of(),
    dropWhile((n) => n < 5),
  );

  const iter = pipeline[Symbol.asyncIterator]();

  t.is((await iter.next()).done, true);
});

test("closes child on return", async (t) => {
  const child = pipe(range(), asAsync());
  const pipeline = pipe(
    child,
    dropWhile((n) => n < 5),
  );
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 5, done: false });

  await iter.return();

  t.is((await child.next()).done, true);
});

test("closes children on throw", async (t) => {
  const child = pipe(range(), asAsync());
  const pipeline = pipe(
    child,
    dropWhile((n) => n < 5),
  );
  const iter = pipeline[Symbol.asyncIterator]();

  t.deepEqual(await iter.next(), { value: 5, done: false });

  await t.throwsAsync(() => iter.throw(new Error("BOOM")));

  t.is((await child.next()).done, true);
});
