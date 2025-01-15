/**
 * Consume an async iterator resulting in a single promise.
 *
 * ```js
 * import { asAsync, pipe } from "yta";
 * import { reduce } from "yta/async";
 * import { range } from "yta/sync";
 *
 * await pipe(
 *   range(10),
 *   asAsync(),
 *   reduce((sum, x) => sum + x, 0),
 * );
 * // => 45
 * ```
 *
 * @template A The input type
 * @template B The output value type
 * @param {(acc: B, item: A) => B} fn The consuming function
 * @param {B} init The initial value
 * @returns {(items: AsyncIterable<A>) => Promise<B>}
 */
export default function reduce(fn, init) {
  return async (items) => {
    let acc = init;

    for await (const item of items) {
      acc = fn(acc, item);
    }

    return acc;
  };
}
