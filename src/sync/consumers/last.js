/**
 * Get the last item of a sequence, or `undefined` if the sequence is empty.
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, last } from "yta/sync";
 *
 * pipe(of("foo", "bar", "baz", "quux"), last());
 * // => "quux"
 * ```
 *
 * **See also:**
 *
 * - {@link at}
 * - {@link first}
 *
 * @template A
 * @returns {(items: Iterable<A>) => A | undefined}
 */
export default function last() {
  return (items) => {
    let lastItem;

    for (const item of items) {
      lastItem = item;
    }

    return lastItem;
  };
}
