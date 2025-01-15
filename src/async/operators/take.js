/**
 * Take a specific number of items from the front sequence and drop the rest.
 *
 * ```js
 * import { pipe } from "yta"
 * import { take, toArray } from "yta/async";
 * import { asAsync, range } from "yta/sync";
 *
 * await pipe(range(15), toAsync(), take(5), toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * If the number is negative take the last `n` numbers of the sequence, which is
 * effectively the same as `drop(length - n)` if you know the length of the
 * length of the iterator.
 *
 * **Note:** Asking for the last items in an async iterator requires the whole
 * iteration to finish before we emit the first item. This will create a lag
 * between when the item was first emitted until it will pass through this
 * operator.
 *
 * ```js
 * import { pipe } from "yta"
 * import { take, toArray } from "yta/async";
 * import { asAsync, range } from "yta/sync";
 *
 * await pipe(range(15) asAsync(), take(-5), toArray());
 * // => [10, 11, 12, 13, 14]
 * ```
 *
 * **Note:** because the length of the iterator is not known—if you use negative
 * index the entire iterator has to be consumed before yielding the first item.
 * This can result in an infinite loop if the iterator is indefinite.
 *
 * **See also:**
 *
 * - {@link slice}
 * - {@link take}
 * - {@link takeWhile}
 *
 * @template A - The item type
 * @param {number} n - The number of items to take
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<A, void>}
 */
export default function take(n) {
  if (n < 0) {
    const negN = -n;

    return async function* (items) {
      /** @type {A[]} */
      const buffer = [];
      let i = 0;

      for await (const item of items) {
        buffer[i] = item;
        i = (i + 1) % negN;
      }

      for (let j = 0; j < buffer.length; j += 1) {
        yield buffer[i];

        i = (i + 1) % negN;
      }
    };
  }

  return async function* (items) {
    let i = 0;

    for await (const item of items) {
      if (i >= n) {
        break;
      }

      i += 1;

      yield item;
    }
  };
}
