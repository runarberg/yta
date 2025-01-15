/**
 * Consume the iterator performing a side effect on each item in the sequence.
 * Returns a promise that resolves when the iteration is finished.
 *
 * ```js
 * import { pipe } from "yta";
 * import { asAsync, range } from "yta/sync";
 * import { forEach } from "yta/async";
 *
 * await pipe(
 *   range(5),
 *   asAsync(),
 *   forEach((n) => console.log(n)),
 * );
 * // => undefined
 * // logs 0, 1, 2, 3, 4
 * ```
 *
 * **See also:**
 *
 * - {@link aside}
 *
 * @template A
 * @param {(item: A) => void} fn - The side effect function
 * @returns {(items: AsyncIterable<A>) => Promise<void>}
 */
export default function forEach(fn) {
  return async (items) => {
    for await (const item of items) {
      fn(item);
    }
  };
}
