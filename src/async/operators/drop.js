/**
 * Drop the first n items from the iterator and continue from there.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { asAsync, range } from "andceter/sync";
 * import { drop, toArray } from "andcetera/async";
 *
 * await pipe(range(15), asAsync(), drop(10), toArray());
 * // => [10, 11, 12, 13, 14]
 * ```
 *
 * If `n` is negative drop them from the end of the sequence instead. Which is
 * effectively the same as `take(length - n)` if you know the length of the
 * iterator.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { asAsync, range } from "andceter/sync";
 * import { drop, toArray } from "andcetera/async";
 *
 * await pipe(range(15), asAsync() drop(-10), toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * **Note:** because the length of the iterator is not known—if you use negative
 * index the entire iterator has to be consumed before yielding the first item.
 * This can result in an infinite loop if the iterator is indefinite.
 *
 * **See also:**
 *
 * * [[`dropWhile`]]
 * * [[`slice`]]
 * * [[`take`]]
 *
 * @template A The item type
 * @param {number} n The number of items to drop
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<A, void>}
 */
export default function drop(n) {
  if (n < 0) {
    return async function* (items) {
      const iter = items[Symbol.asyncIterator]();
      /** @type {A[]} */
      const buffer = [];

      for (let i = 0; i < -n; i += 1) {
        const { value, done } = await iter.next();

        if (done) {
          return;
        }

        buffer.push(value);
      }

      let i = 0;

      try {
        let next = await iter.next();

        while (!next.done) {
          yield buffer[i];

          buffer[i] = next.value;
          i = (i + 1) % buffer.length;
          next = await iter.next();
        }
      } finally {
        if (typeof iter.return === "function") {
          iter.return();
        }
      }
    };
  }

  return async function* (items) {
    const iter = items[Symbol.asyncIterator]();

    for (let i = 0; i < n; i += 1) {
      const { done } = await iter.next();

      if (done) {
        return;
      }
    }

    try {
      let next = await iter.next();

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
