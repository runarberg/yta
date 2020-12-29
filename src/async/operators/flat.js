/**
 * Flatten an aync iterator of iterators into a single async iterator of items.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { flat, of, toArray } from "andcetera/async";
 *
 * await pipe(of(of(0, 3), of(3, 6)), flat(), toArray());
 * // => [0, 3, 3, 6]
 * ```
 *
 * **See also:**
 *
 * - [[`chain`]]
 * - [[`flatMap`]]
 *
 * @template A - The item type
 * @returns {(iters: AsyncIterable<AsyncIterable<A>>) => AsyncGenerator<A, void>}
 */
export default function flat() {
  return async function* (iters) {
    for await (const items of iters) {
      for await (const item of items) {
        yield item;
      }
    }
  };
}
