/**
 * Drop every item from the iterator while the predicate function holds true,
 * after that every item is emitted.
 *
 * ```js
 * import { dropWhile, pipe, range, toArray } from "andcetera";
 *
 * pipe(
 *   range(10),
 *   dropWhile((n) => n < 5),
 *   toArray(),
 * );
 * // => [5, 6, 7, 8, 9]
 * ```
 *
 * **See also:**
 *
 * * [[`drop`]]
 * * [[`takeWhile`]]
 *
 * @template A The item type
 * @param {(item: A) => boolean} p The predicate function
 * @returns {(items: Iterable<A>) => Iterable<A>}
 */
export default function dropWhile(p) {
  return function* (items) {
    const iter = items[Symbol.iterator]();
    let next = iter.next();

    while (!next.done && p(next.value)) {
      next = iter.next();
    }

    while (!next.done) {
      yield next.value;

      next = iter.next();
    }
  };
}
