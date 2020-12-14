import pipe from "../extras/pipe.js";
import take from "../operators/take.js";

import last from "./last.js";

/**
 * Get the item at the given index, or `undefined` if the sequence is empty.
 * Negative values count backwards from the end.
 *
 * ```js
 * import { at, of, pipe } from "andcetera";
 *
 * pipe(of("foo", "bar", "baz", "quux"), at(2));
 * // => "baz"

 * pipe(of("foo", "bar", "baz", "quux"), at(-1));
 * // => "quux"
 * ```
 *
 * **See also:**
 *
 * * [[`first`]]
 * * [[`last`]]
 *
 * @template A
 * @param {number} index
 * @returns {(items: Iterable<A>) => A | undefined}
 */
export default function at(index) {
  if (index >= 0) {
    return (items) => pipe(items, take(index + 1), last());
  }

  const length = -index;

  return (items) => {
    const candidates = Array.from({ length });
    let i = 0;

    for (const item of items) {
      candidates[i] = item;

      i = (i + 1) % length;
    }

    return candidates[i];
  };
}
