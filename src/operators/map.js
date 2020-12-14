/**
 * Map each item in the iterator.
 *
 * ```js
 * import { map, pipe, range, toArray } from "andcetera";
 *
 * pipe(
 *   range(3),
 *   map((x) => x * 2),
 * );
 * // => [0, 2, 4]
 * ```
 *
 * **See also:**
 *
 * * [[`flatMap`]]
 *
 * @template A - The input type
 * @template B - The output type
 * @param {(item: A) => B} fn - The mapping function
 * @returns {(items: Iterable<A>) => Iterable<B>}
 */
export default function map(fn) {
  return function* (items) {
    for (const item of items) {
      yield fn(item);
    }
  };
}
