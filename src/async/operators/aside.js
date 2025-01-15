import map from "./map.js";

/**
 * Perform a side effect with each element while passing the value on. Useful
 * for inspecting items they pass through a pipeline.
 *
 * ```js
 * import { pipe } from "yta";
 * import { aside, map, of, toArray } from "yta/async";
 *
 * pipe(
 *   of(0, 1, 2, 3, 4),
 *   map((n) => n ** 2),
 *   aside((n) => {
 *     // Inspect the state at this point.
 *     console.log(n);
 *   }),
 *   toArray(),
 * );
 * ```
 *
 * **See also:**
 *
 * - {@link forEach}
 *
 * @template A - The item type
 * @param {(item: A) => void} fn - The side effect producing function
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<A, void>}
 */
export default function aside(fn) {
  return map((item) => {
    fn(item);

    return item;
  });
}
