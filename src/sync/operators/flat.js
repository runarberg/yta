/**
 * Flatten an iterator of iterators into a single iterator of items.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { flat, of, range, toArray } from "andcetera/sync";
 *
 * pipe(of(range(0, 3), range(3, 6)), flat());
 * // => [0, 1, 2, 3, 4, 5]
 * ```
 *
 * **See also:**
 *
 * - [[`chain`]]
 * - [[`flatMap`]]
 *
 * @template A - The item type
 * @returns {(iters: Iterable<Iterable<A>>) => Generator<A, void>}
 */
export default function flat() {
  return function* (iters) {
    for (const items of iters) {
      for (const item of items) {
        yield item;
      }
    }
  };
}
