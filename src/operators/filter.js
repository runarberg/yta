/**
 * Filter items in the iterator leaving only the items that fulfill the predicate.
 *
 * ```js
 * import { filter, pipe, range, toArray } from "andcetera";
 *
 * pipe(
 *   range(10),
 *   filter((n) => n % 2 === 0),
 *   toArray(),
 * );
 * // => [0, 2, 4, 6, 8]
 * ```
 *
 * @template A The item type
 * @param {(item: A) => boolean} p The predicated function
 * @returns {(items: Iterable<A>) => Iterable<A>}
 */
export default function filter(p) {
  return function* (items) {
    for (const item of items) {
      if (p(item)) {
        yield item;
      }
    }
  };
}
