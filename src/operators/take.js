/**
 * Take a specific number of items from the front sequence and drop the rest.
 *
 * ```js
 * import { pipe, range, take, toArray } from "andcetera";
 *
 * pipe(range(15), take(5), toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * If the number is negative take the last `n` numbers of the sequence, which is
 * effectively the same as `drop(length - n)` if you know the length of the
 * length of the iterator.
 *
 * ```js
 * import { pipe, range, take, toArray } from "andcetera";
 *
 * pipe(range(15), take(-5), toArray());
 * // => [10, 11, 12, 13, 14]
 * ```
 *
 * **Note:** because the length of the iterator is not known—if you use negative
 * index the entire iterator has to be consumed before yielding the first item.
 * This can result in an infinite loop if the iterator is indefinite.
 *
 * **See also:**
 *
 * * [[`slice`]]
 * * [[`take`]]
 * * [[`takeWhile`]]
 *
 * @template A - The item type
 * @param {number} n - The number of items to take
 * @returns {(items: Iterable<A>) => Iterable<A>}
 */
export default function take(n) {
  if (n < 0) {
    const negN = -n;

    return function* (items) {
      /** @type {A[]} */
      const buffer = [];
      let i = 0;

      for (const item of items) {
        buffer[i] = item;
        i = (i + 1) % negN;
      }

      for (let j = 0; j < buffer.length; j += 1) {
        yield buffer[i];

        i = (i + 1) % negN;
      }
    };
  }

  return function* (items) {
    let i = 0;

    for (const item of items) {
      if (i >= n) {
        break;
      }

      i += 1;

      yield item;
    }
  };
}
