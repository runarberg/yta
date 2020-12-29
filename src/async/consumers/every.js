/**
 * Consumes the iterator into true if predicate holds true for every item in the sequence.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { every, of } from "andcetera/async";
 *
 * await pipe(
 *   of(2, 4, 6),
 *   every((n) => n % 2 === 0),
 * );
 * // => true
 *
 * await pipe(
 *   of("foo", "bar", "baz"),
 *   every((str) => str.startsWith("b")),
 * );
 * // => false
 *
 * await pipe(
 *   of(),
 *   every(() => false),
 * );
 * // => true
 * ```
 *
 * **See also:**
 *
 * * [[`some`]]
 *
 * @template A
 * @param {(item: A) => boolean} p The predicate function
 * @returns {(items: AsyncIterable<A>) => Promise<boolean>}
 */
export default function every(p) {
  return async (items) => {
    for await (const item of items) {
      if (!p(item)) {
        return false;
      }
    }

    return true;
  };
}
