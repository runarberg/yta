/**
 * Filter items in the iterator such that no two items fulfill the same predicate.
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, toArray, uniqueOn } from "yta/sync";
 *
 * pipe(
 *   of(
 *     { id: 1, type: "a" },
 *     { id: 2, type: "b" },
 *     { id: 3, type: "a" },
 *     { id: 4, type: "c" },
 *   ),
 *   uniqueOn(({ type }) => type),
 *   toArray(),
 * );
 * // => [
 * //   { id: 1, type: "a" },
 * //   { id: 2, type: "b" },
 * //   { id: 4, type: "c" },
 * // ]
 * ```
 *
 * @template A - The item type
 * @template P - The predicate type
 * @param {(item: A) => P} p - The predicated function
 * @returns {(items: Iterable<A>) => Generator<A, void>}
 */
export default function uniqueOn(p) {
  return function* (items) {
    /** @type {Set<P>} */
    const collection = new Set();

    for (const item of items) {
      const c = p(item);
      if (!collection.has(c)) {
        yield item;
        collection.add(c);
      }
    }
  };
}
