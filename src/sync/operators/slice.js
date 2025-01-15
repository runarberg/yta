import pipe from "../../extras/pipe.js";
import { compose } from "../../utils.js";

import drop from "./drop.js";
import enumerate from "./enumerate.js";
import map from "./map.js";
import takeWhile from "./take-while.js";
import take from "./take.js";

/**
 * Slice the iterator between the indices. If either index is negative, count
 * from the end. Works similar to `Array.prototype.slice`.
 *
 * For indices 0 ≤ `start` ≤ `end` this is the same as calling `drop(start)`
 * and `take(end - start)` in sequence on an iterator.
 *
 * ```js
 * import { pipe } from "yta";
 * import { asAsync, range } from "yta/sync";
 * import { slice } from "yta/async";
 *
 * [...pipe(range(15), asAsync(), slice(10))];
 * // => [10, 11, 12, 13, 14]
 *
 * [...pipe(range(15), asAsync(), slice(5, 8))];
 * // => [5, 6, 7]
 *
 * [...pipe(range(15), slice(-5))];
 * // => [10, 11, 12, 13, 14]
 *
 * [...pipe(range(15), slice(0, -5))];
 * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * [...pipe(range(15), slice(5, -5))];
 * // => [5, 6, 7, 8, 9]
 * ```
 *
 * **Note:** Similar to {@link drop} and {@link take}—because the length of the
 * iterator is not known—if you use negative index the entire iterator has to be
 * consumed before yielding the first item. This can result in an infinite loop
 * if the iterator is indefinite.
 *
 * **See also:**
 *
 * - {@link drop}
 * - {@link take}
 * - [`Array.prototype.slice`][Array#slice]
 *
 * [Array#slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 *
 * @template A
 * @param {number} start
 * @param {number} end
 * @returns {(items: Iterable<A>) => Generator<A, void>}
 */
export default function slice(start = 0, end = Number.POSITIVE_INFINITY) {
  if (start >= 0) {
    if (end >= 0) {
      return compose(take(Math.max(0, end - start)), drop(start));
    }

    return compose(drop(start), drop(end));
  }

  if (end < 0) {
    return compose(take(Math.min(0, start - end)), drop(end));
  }

  return (items) =>
    pipe(
      items,
      enumerate(),
      take(start),
      takeWhile(([i]) => i < end),
      map(([, item]) => item),
    );
}
