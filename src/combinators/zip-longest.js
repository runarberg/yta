/**
 * Take any number of iterators, and zip them together into one iterator of
 * tuples. It will continue yielding tuples until all the iterators have
 * closed, putting `undefined` in the place of closed iterators.
 *
 * ```js
 * import {
 *   flatRepeat,
 *   of,
 *   pipe,
 *   range,
 *   take,
 *   toArray,
 *   zipLongest,
 * } from "andcetera";
 *
 * pipe(
 *   zipLongest(
 *     of("a", "b"),
 *     range(5),
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
 * @param {{ [K in keyof A]: Iterable<A[K]> }} items - The iterators to be
 *     zipped
 * @returns {Iterable<{ [K in keyof A]: A[K] | undefined }>}
 */
export default function* zipLongest(...items) {
  const iters = items.map((item) => item[Symbol.iterator]());
  let buffer = iters.map((iter) => iter.next());

  while (buffer.some(({ done }) => !done)) {
    yield /** @type {{ [K in keyof A]: A[K] | undefined }} */ (buffer.map(
      ({ value }) => value,
    ));

    buffer = iters.map((iter) => iter.next());
  }
}
