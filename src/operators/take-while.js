/**
 * Take the first items from the iterator while the predicate function holds
 * true, after that the iterator closes.
 *
 * ```js
 * import { pipe, range, takeWhile, toArray } from "andcetera";
 *
 * pipe(
 *   range(10),
 *   takeWhile((n) => n < 5),
 *   toArray(),
 * );
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * **See also:**
 *
 * * [[`dropWhile`]]
 * * [[`take`]]
 *
 * @template A The item type
 * @param {(item: A) => boolean} p The predicate function
 * @returns {(items: Iterable<A>) => Iterable<A>}
 */
export default function takeWhile(p) {
  return function* (items) {
    for (const item of items) {
      if (p(item)) {
        yield item;
      } else {
        break;
      }
    }
  };
}
