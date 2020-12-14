/**
 * Consumes the iterator into true if predicate holds true for every item in the sequence.
 *
 * ```js
 * import { every, of, pipe } from "andcetera";
 *
 * pipe(
 *   of(2, 4, 6),
 *   every((n) => n % 2 === 0),
 * );
 * // => true
 *
 * pipe(
 *   of("foo", "bar", "baz"),
 *   every((str) => str.startsWith("b")),
 * );
 * // => false
 * ```
 *
 * **See also:**
 *
 * * [[`some`]]
 *
 * @template A
 * @param {(item: A) => boolean} p The predicate function
 * @returns {(items: Iterable<A>) => boolean}
 */
export default function every(p) {
  return (items) => {
    for (const item of items) {
      if (!p(item)) {
        return false;
      }
    }

    return true;
  };
}
