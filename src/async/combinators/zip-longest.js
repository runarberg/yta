/**
 * Take any number of iterators, and zip them together into one iterator of
 * tuples. It will continue yielding tuples until all the iterators have
 * closed, putting `undefined` in the place of closed iterators.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { flatRepeat, of, take, toArray, zipLongest } from "andcetera/async";
 *
 * await pipe(
 *   zipLongest(
 *     of("a", "b"),
 *     of(0, 1, 2, 3, 4),
 *     pipe(
 *       flatRepeat(() => of(true, false)),
 *       take(3)
 *     ),
 *   ),
 *   toArray(),
 * );
 * // => [
 * //      ["a", 0, true],
 * //      ["b", 1, false],
 * //      [undefined, 2, true],
 * //      [undefined, 3, undefined],
 * //      [undefined, 4, undefined],
 * //    ]
 * ```
 *
 * **See also:**
 *
 * * [[`zip`]]
 *
 * @template {unknown[]} A - Tuple type with item type of each input iterator
 * @param {{ [K in keyof A]: AsyncIterable<A[K]> }} items - The iterators to be
 *     zipped
 * @returns {AsyncGenerator<{ [K in keyof A]: A[K] | undefined }, void>}
 */
export default async function* zipLongest(...items) {
  const iters = items.map((item) => item[Symbol.asyncIterator]());
  const nexts = () => Promise.all(iters.map((iter) => iter.next()));

  try {
    let results = await nexts();

    while (results.some(({ done }) => !done)) {
      yield /** @type {{ [K in keyof A]: A[K] | undefined }} */ (results.map(
        ({ value }) => value,
      ));

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
