/**
 * Consume the iterator resulting in a single value.
 *
 * ```js
 * import { pipe } from "yta";
 * import , range, reduce } from "yta/sync";
 *
 * pipe(
 *   range(10),
 *   reduce((sum, x) => sum + x, 0),
 * );
 * // => 45
 * ```
 *
 * **See also:**
 *
 * - {@link accumulate}
 * - {@link recurrent}
 *
 * @template A - The input type
 * @template B - The output value type
 * @param {(acc: B, item: A) => B} fn - The consuming function
 * @param {B} init - The initial value
 * @returns {(items: Iterable<A>) => B}
 */
export default function reduce(fn, init) {
  return (items) => {
    let acc = init;

    for (const item of items) {
      acc = fn(acc, item);
    }

    return acc;
  };
}
