/**
 * Consumes the iterator into true if predicate holds true for one of more of
 * the items in the sequence.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { of, some } from "andcetera/sync";
 *
 * pipe(
 *   of(1, 3, 5),
 *   some((n) => n % 2 === 0),
 * );
 * // => false
 *
 * pipe(
 *   of("foo", "bar", "baz"),
 *   some((str) => str.startsWith("b")),
 * );
 * // => true
 *
 * pipe(
 *   of(),
 *   some(() => true),
 * );
 * // => false
 * ```
 *
 * **See also:**
 *
 * - [[`every`]]
 * - [[`includes`]]
 *
 * @template A
 * @param {(item: A) => boolean} p - The predicate function
 * @returns {(items: Iterable<A>) => boolean}
 */
export default function some(p) {
  return (items) => {
    for (const item of items) {
      if (p(item)) {
        return true;
      }
    }

    return false;
  };
}
