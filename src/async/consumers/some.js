/**
 * Consumes the iterator into true if predicate holds true for one of more of
 * the items in the sequence.
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, some } from "yta/async";
 *
 * await pipe(
 *   of(1, 3, 5),
 *   some((n) => n % 2 === 0),
 * );
 * // => false
 *
 * await pipe(
 *   of("foo", "bar", "baz"),
 *   some((str) => str.startsWith("b")),
 * );
 * // => true
 *
 * await pipe(
 *   of(),
 *   some(() => true),
 * );
 * // => false
 * ```
 *
 * **See also:**
 *
 * - {@link every}
 * - {@link includes}
 *
 * @template A
 * @param {(item: A) => boolean} p - The predicate function
 * @returns {(items: AsyncIterable<A>) => Promise<boolean>}
 */
export default function some(p) {
  return async (items) => {
    for await (const item of items) {
      if (p(item)) {
        return true;
      }
    }

    return false;
  };
}
