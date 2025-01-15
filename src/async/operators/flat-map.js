import { compose } from "../../utils.js";

import flat from "./flat.js";
import map from "./map.js";

/**
 * Map each item into an iterator and flatten.
 *
 * ```js
 * import { pipe } from "yta";
 * import { flatMap, toArray } from "yta/async";
 * import { range } from "yta/sync";
 *
 * await pipe(
 *   of(0, 1, 2, 3),
 *   flatMap((n) => of(...range(n))),
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
 * @param {(item: A) => AsyncIterable<B>} fn - The mapping function
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<B, void>}
 */
export default function flatMap(fn) {
  return compose(flat(), map(fn));
}
