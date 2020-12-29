/**
 * Get the item at the given index, or `undefined` if the sequence is empty.
 * Negative values count backwards from the end.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { at, of } from "andcetera/sync";
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
  if (index < 0) {
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

  return (items) => {
    let i = 0;

    for (const item of items) {
      if (i === index) {
        return item;
      }

      i += 1;
    }
  };
}
