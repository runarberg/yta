/**
 * Count the items in the iterator and consume it.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { count, range } from "andcetera/async";
 *
 * pipe(range(10), count());
 * // => 10
 * ```
 *
 * @template A - The input type
 * @returns {(items: AsyncIterable<A>) => Promise<number>}
 */
export default function count() {
  return async (items) => {
    let total = 0;

    for await (const _ of items) {
      total += 1;
    }

    return total;
  };
}
