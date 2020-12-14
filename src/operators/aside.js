import map from "./map.js";

/**
 * Perform a side effect with each element while passing the value on. Useful
 * for inspecting items they pass through a pipeline.
 *
 * ```js
 * import { aside, map, pipe, range, toArray } from "andcetera";
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
 * ```
 *
 * **See also:**
 *
 * * [[`forEach`]]
 *
 * @template A The item type
 * @param {(item: A) => void} fn The side effect producing function
 * @returns {(items: Iterable<A>) => Iterable<A>}
 */

export default function aside(fn) {
  return map((item) => {
    fn(item);

    return item;
  });
}
