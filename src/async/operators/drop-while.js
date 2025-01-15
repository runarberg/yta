/**
 * Drop every item from the iterator while the predicate function holds true,
 * after that every item is emitted.
 *
 * ```js
 * import { pipe } from "yta";
 * import { dropWhile, toArray } from "yta/async";
 * import { asAsync, range } from "yta/sync";
 *
 * await pipe(
 *   range(10),
 *   asAsync(),
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
 * @template A The item type
 * @param {(item: A) => boolean} p The predicate function
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<A, void>}
 */
export default function dropWhile(p) {
  return async function* (items) {
    const iter = items[Symbol.asyncIterator]();
    let next = await iter.next();

    while (!next.done && p(next.value)) {
      next = await iter.next();
    }

    try {
      while (!next.done) {
        yield next.value;

        next = await iter.next();
      }
    } finally {
      if (typeof iter.return === "function") {
        iter.return();
      }
    }
  };
}
