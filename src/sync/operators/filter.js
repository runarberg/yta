/**
 * Filter items in the iterator leaving only the items that fulfill the predicate.
 *
 * ```js
 * import { pipe } from "yta";
 * import { filter, range, toArray } from "yta/sync";
 *
 * pipe(
 *   range(10),
 *   filter((n) => n % 2 === 0),
 *   toArray(),
 * );
 * // => [0, 2, 4, 6, 8]
 * ```
 *
 * @template A - The item type
 * @param {(item: A) => boolean} p - The predicated function
 * @returns {(items: Iterable<A>) => Generator<A, void>}
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
