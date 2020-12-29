/**
 * Get the last item of a sequence, or `undefined` if the sequence is empty.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { of, last } from "andcetera/sync";
 *
 * pipe(of("foo", "bar", "baz", "quux"), last());
 * // => "quux"
 * ```
 *
 * **See also:**
 *
 * * [[`at`]]
 * * [[`first`]]
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
