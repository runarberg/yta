/**
 * Get the last item of a sequence, or `undefined` if the sequence is empty.
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, last } from "yta/async";
 *
 * await pipe(of("foo", "bar", "baz", "quux"), last());
 * // => "quux"
 * ```
 *
 * **See also:**
 *
 * - {@link at}
 * - {@link first}
 *
 * @template A
 * @returns {(items: AsyncIterable<A>) => Promise<A | undefined>}
 */
export default function last() {
  return async (items) => {
    let lastItem;

    for await (const item of items) {
      lastItem = item;
    }

    return lastItem;
  };
}
