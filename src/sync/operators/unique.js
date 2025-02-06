/**
 * Filter items in the iterator such that no two items are the same.
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, toArray, unique } from "yta/sync";
 *
 * pipe(
 *   of(1, 2, 2, 3, 4, 5, 4),
 *   unique(),
 *   toArray(),
 * );
 * // => [1, 2, 3, 4, 5]
 * ```
 *
 * @since 1.1.0
 * @template A - The item type
 * @returns {(items: Iterable<A>) => Generator<A, void>}
 */
export default function unique() {
  return function* (items) {
    /** @type {Set<A>} */
    const collection = new Set();

    for (const item of items) {
      if (!collection.has(item)) {
        yield item;
        collection.add(item);
      }
    }
  };
}
