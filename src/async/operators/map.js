/**
 * Map each item in the iterator.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { map, of, toArray } from "andcetera/async";
 *
 * await pipe(
 *   of(0, 1, 2),
 *   map((x) => x * 2),
 * );
 * // => [0, 2, 4]
 * ```
 *
 * **See also:**
 *
 * - [[`flatMap`]]
 *
 * @template A - The input type
 * @template B - The output type
 * @param {(item: A) => B} fn - The mapping function
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<B, void>}
 */
export default function map(fn) {
  return async function* (items) {
    for await (const item of items) {
      yield fn(item);
    }
  };
}
