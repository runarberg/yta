/**
 * Get the item at the given index, or `undefined` if the sequence is empty.
 * Negative values count backwards from the end.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { at, of } from "andcetera/async";
 *
 * await pipe(of("foo", "bar", "baz", "quux"), at(2));
 * // => "baz"

 * await pipe(of("foo", "bar", "baz", "quux"), at(-1));
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
 * @returns {(items: AsyncIterable<A>) => Promise<A | undefined>}
 */
export default function at(index) {
  if (index < 0) {
    const length = -index;

    return async (items) => {
      const candidates = Array.from({ length });
      let i = 0;

      for await (const item of items) {
        candidates[i] = item;

        i = (i + 1) % length;
      }

      return candidates[i];
    };
  }

  return async (items) => {
    let i = 0;

    for await (const item of items) {
      if (i === index) {
        return item;
      }

      i += 1;
    }
  };
}
