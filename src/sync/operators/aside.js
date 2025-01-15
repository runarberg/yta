import map from "./map.js";

/**
 * Perform a side effect with each element while passing the value on. Useful
 * for inspecting items they pass through a pipeline.
 *
 * ```js
 * import { pipe } from "yta";
 * import { aside, map, range, toArray } from "yta/sync";
 *
 * pipe(
 *   range(5),
 *   map((n) => n ** 2),
 *   aside((n) => {
 *     // Inspect the state at this point.
 *     console.log(n);
 *   }),
 *   toArray(),
 * );
 * // => [0, 1, 4, 9, 16]
 * // console logs `0`, `1`, `4`, `9`, and `16`.
 * ```
 *
 * **See also:**
 *
 * - {@link forEach}
 *
 * @template A The item type
 * @param {(item: A) => void} fn The side effect producing function
 * @returns {(items: Iterable<A>) => Generator<A, void>}
 */
export default function aside(fn) {
  return map((item) => {
    fn(item);

    return item;
  });
}
