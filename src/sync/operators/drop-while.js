/**
 * Drop every item from the iterator while the predicate function holds true,
 * after that every item is emitted.
 *
 * ```js
 * import { pipe } from "yta";
 * import { dropWhile, range, toArray } from "yta/sync";
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
 * - {@link drop}
 * - {@link takeWhile}
 *
 * @template A - The item type
 * @param {(item: A) => boolean} p - The predicate function
 * @returns {(items: Iterable<A>) => Generator<A, void>}
 */
export default function dropWhile(p) {
  return function* (items) {
    const iter = items[Symbol.iterator]();
    let next = iter.next();

    while (!next.done && p(next.value)) {
      next = iter.next();
    }

    try {
      while (!next.done) {
        yield next.value;

        next = iter.next();
      }
    } finally {
      if (typeof iter.return === "function") {
        iter.return();
      }
    }
  };
}
