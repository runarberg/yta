/**
 * Filter items in the iterator leaving only the items that fulfill the predicate.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { filter, toArray } from "andcetera/async";
 * import { asAsync, range } from "andcetera/sync";
 *
 * await pipe(
 *   range(10),
 *   asAsync(),
 *   filter((n) => n % 2 === 0),
 *   toArray(),
 * );
 * // => [0, 2, 4, 6, 8]
 * ```
 *
 * @template A - The item type
 * @param {(item: A) => boolean} p - The predicated function
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<A, void>}
 */
export default function filter(p) {
  return async function* (items) {
    for await (const item of items) {
      if (p(item)) {
        yield item;
      }
    }
  };
}
