import pipe from "../extras/pipe.js";
import flat from "../operators/flat.js";

/**
 * Take any number of iterators and run them in a single series, one after the other.
 *
 * ```js
 * import { chain, range } from "andcetera";
 *
 * [...chain(range(0, 3), range(3, 6))];
 * // => [0, 1, 2, 3, 4, 5]
 * ```
 *
 * **See also:**
 *
 * * [[`flat`]]
 *
 * @template A
 * @param {Iterable<A>[]} items
 * @returns {Iterable<A>}
 */
export default function chain(...items) {
  return pipe(items, flat());
}
