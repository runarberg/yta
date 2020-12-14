/**
 * Take any number of iterators, and zip them together into one iterator of
 * tuples. Closes after the shortest of the inputs closes.
 *
 * ```js
 * import { flatRepeat, of, pipe, range, toArray, zip } from "andcetera";
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
 * import { flatRepeat, of, pipe, range, toArray, zip } from "andcetera";
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
 * * [[`zipLongest`]]
 *
 * @template {unknown[]} A Tuple type with item type of each input iterator
 * @param {{ [K in keyof A]: Iterable<A[K]> }} items The iterators to be zipped
 * @returns {Iterable<A>}
 */
export default function* zip(...items) {
  const iters = items.map((item) => item[Symbol.iterator]());
  let buffer = iters.map((iter) => iter.next());

  while (!buffer.some(({ done }) => done)) {
    yield /** @type {A} */ (buffer.map(({ value }) => value));

    buffer = iters.map((iter) => iter.next());
  }
}
