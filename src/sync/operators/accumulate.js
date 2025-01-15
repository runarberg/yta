/**
 * Map the iterator with a function that can access the previous result. Works
 * similar to {@link reduce} except that instead of returning a single value, we
 * yield on every iteration and return the new iterator.
 *
 * ```js
 * import { pipe } from "yta";
 * import { accumulate, range, toArray } from "yta/sync";
 *
 * pipe(
 *   range(1, 6),
 *   accumulate((sum, item) => sum + item, 0),
 *   toArray(),
 * );
 * // => [1, 3, 6, 10, 15]
 * ```
 *
 * You can use this to create pair wise accumulation of previous and current
 * items.
 *
 * ```js
 * import { pipe } from "yta";
 * import { accumulate, drop, range, toArray } from "yta/sync";
 *
 * pipe(
 *   range(1, 6),
 *   accumulate(([, last], current) => [last, current], [0, 0]),
 *   drop(1),
 *   toArray(),
 * );
 * // => [[1, 2], [2, 3], [3, 4], [4, 5]]
 * ```
 *
 * **See also:**
 *
 * - {@link recurrent}
 * - {@link reduce}
 *
 * @template A - The input item type
 * @template B - The output item type
 * @param {(acc: B, item: A) => B} fn - The accumulator function
 * @param {B} init - The first item passed to the accumulator function
 * @returns {(items: Iterable<A>) => Generator<B, void>}
 */
export default function accumulate(fn, init) {
  return function* (items) {
    let acc = init;

    for (const item of items) {
      acc = fn(acc, item);

      yield acc;
    }
  };
}
