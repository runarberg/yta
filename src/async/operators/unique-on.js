/**
 * Filter items in the iterator such that no two items fulfill the same predicate.
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, toArray, uniqueOn } from "yta/async";
 *
 * await pipe(
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
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<A, void>}
 */
export default function uniqueOn(p) {
  return async function* (items) {
    /** @type {Set<P>} */
    const collection = new Set();

    for await (const item of items) {
      const c = p(item);
      if (!collection.has(c)) {
        yield item;
        collection.add(c);
      }
    }
  };
}
