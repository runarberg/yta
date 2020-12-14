/**
 * Count the items in the iterator and consume it.
 *
 * ```js
 * import { count, pipe, range } from "andcetera";
 *
 * pipe(range(10), count());
 * // => 10
 * ```
 *
 * @template A The input type
 * @returns {(items: Iterable<A>) => number}
 */
export default function count() {
  return (items) => {
    let total = 0;

    for (const _ of items) {
      total += 1;
    }

    return total;
  };
}
