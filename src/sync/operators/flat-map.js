import { compose } from "../../utils.js";

import flat from "./flat.js";
import map from "./map.js";

/**
 * Map each item into an iterator and flatten.
 *
 * ```js
 * import { pipe } from "yta";
 * import { flatMap, range, toArray } from "yta/sync";
 *
 * pipe(
 *   range(4),
 *   flatMap((n) => range(n)),
 *   toArray(),
 * );
 * // => [0, 0, 1, 0, 1, 2]
 * ```
 *
 * **See also:**
 *
 * - {@link flat}
 * - {@link flatRepeat}
 * - {@link map}
 *
 * @template A - The input type
 * @template B - The output type
 * @param {(item: A) => Iterable<B>} fn - The mapping function
 * @returns {(items: Iterable<A>) => Generator<B, void>}
 */
export default function flatMap(fn) {
  return compose(flat(), map(fn));
}
