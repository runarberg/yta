/**
 * Take any number of iterators and run them in a single series, one after the other.
 *
 * ```js
 * import { pipe } from "yta";
 * import { chain, of, toArray } from "yta/async";
 *
 * await pipe(chain(of(0, 1, 2), of(3, 4, 5)), toArray());
 * // => [0, 1, 2, 3, 4, 5]
 * ```
 *
 * **See also:**
 *
 * - {@link flat}
 *
 * @template A
 * @param {AsyncIterable<A>[]} iters
 * @returns {AsyncGenerator<A, void>}
 */
export default async function* chain(...iters) {
  for (const items of iters) {
    for await (const item of items) {
      yield item;
    }
  }
}
