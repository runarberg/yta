/**
 * Take the first items from the iterator while the predicate function holds
 * true, after that the iterator closes.
 *
 * ```js
 * import { pipe } from "yta";
 * import { range, takeWhile, toArray } from "yta/sync";
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
 * - {@link dropWhile}
 * - {@link take}
 *
 * @template A - The item type
 * @param {(item: A) => boolean} p - The predicate function
 * @returns {(items: Iterable<A>) => Generator<A, void>}
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
