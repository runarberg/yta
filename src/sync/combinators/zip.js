/**
 * Take any number of iterators, and zip them together into one iterator of
 * tuples. Closes after the shortest of the inputs closes.
 *
 * ```js
 * import { pipe } from "yta";
 * import { flatRepeat, of, range, toArray, zip } from "yta/sync";
 *
 * pipe(
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
 * If you want to zip an iterator of iterators in a pipeline you can use them
 * spread opperator.
 *
 * ```js
 * import { pipe } from "yta";
 * import { flatRepeat, of, range, toArray, zip } from "yta/sync";
 *
 * pipe(
 *   of(
 *     of("a", "b", "c"),
 *     range(),
 *     flatRepeat(() => of(true, false)),
 *   ),
 *   (iterables) => zip(...iterables),
 *   toArray(),
 * );
 * // => [["a", 0, true], ["b", 1, false], ["c", 2, true]]
 * ```
 *
 * **See also:**
 *
 * - {@link zipLongest}
 *
 * @template {unknown[]} A - Tuple type with item type of each input iterator
 * @param {{ [K in keyof A]: Iterable<A[K]> }} items - The iterators to be zipped
 * @returns {Generator<A, void>}
 */
export default function* zip(...items) {
  const iters = items.map((item) => item[Symbol.iterator]());

  try {
    let results = iters.map((iter) => iter.next());

    while (!results.some(({ done }) => done)) {
      yield /** @type {A} */ (results.map(({ value }) => value));

      results = iters.map((iter) => iter.next());
    }
  } finally {
    iters.forEach((iter) => {
      if (typeof iter.return === "function") {
        iter.return();
      }
    });
  }
}
