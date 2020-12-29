/**
 * Take any number of iterators, and zip them together into one iterator of
 * tuples. Closes after the shortest of the inputs closes.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { flatRepeat, of, toArray, zip } from "andcetera/async";
 * import { range } from "andcetera/sync";
 *
 * await pipe(
 *   zip(
 *     of("a", "b", "c"),
 *     range(),
 *     flatRepeat(() => of(true, false)),
 *   ),
 *   toArray(),
 * );
 * // => [["a", 0, true], ["b", 1, false], ["c", 2, true]]
 * ```
 *
 * **See also:**
 *
 * * [[`zipLongest`]]
 *
 * @template {unknown[]} A - Tuple type with item type of each input iterator
 * @param {{ [K in keyof A]: AsyncIterable<A[K]> }} items The iterators to be
 *     zipped
 * @returns {AsyncGenerator<A, void>}
 */
export default async function* zip(...items) {
  const iters = items.map((item) => item[Symbol.asyncIterator]());
  const nexts = () => Promise.all(iters.map((iter) => iter.next()));

  try {
    let results = await nexts();

    while (!results.some(({ done }) => done)) {
      yield /** @type {A} */ (results.map(({ value }) => value));

      results = await nexts();
    }
  } finally {
    iters.forEach((iter) => {
      if (typeof iter.return === "function") {
        iter.return();
      }
    });
  }
}
