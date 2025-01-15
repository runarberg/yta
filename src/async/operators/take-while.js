/**
 * Take the first items from the iterator while the predicate function holds
 * true, after that the iterator closes.
 *
 * ```js
 * import { pipe } from "yta";
 * import { takeWhile, toArray } from "yta/async";
 * import { asAsync, range } from "yta/async";
 *
 * await pipe(
 *   range(10),
 *   asAsync(),
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
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<A, void>}
 */
export default function takeWhile(p) {
  return async function* (items) {
    for await (const item of items) {
      if (p(item)) {
        yield item;
      } else {
        break;
      }
    }
  };
}
