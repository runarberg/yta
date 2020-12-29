/**
 * Get the last item of a sequence, or `undefined` if the sequence is empty.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { of, last } from "andcetera/async";
 *
 * await pipe(of("foo", "bar", "baz", "quux"), last());
 * // => "quux"
 * ```
 *
 * **See also:**
 *
 * * [[`at`]]
 * * [[`first`]]
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
