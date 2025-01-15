/**
 * Drop the first n items from the iterator and continue from there.
 *
 * ```js
 * import { pipe } from "yta";
 * import { drop, range, toArray } from "yta/sync";
 *
 * pipe(range(15), drop(10), toArray());
 * // => [10, 11, 12, 13, 14]
 * ```
 *
 * If `n` is negative drop them from the end of the sequence instead. Which is
 * effectively the same as `take(length - n)` if you know the length of the
 * iterator.
 *
 * ```js
 * import { pipe } from "yta";
 * import { drop, range, toArray } from "yta";
 *
 * pipe(range(15), drop(-10), toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * **Note:** because the length of the iterator is not known—if you use negative
 * index the entire iterator has to be consumed before yielding the first item.
 * This can result in an infinite loop if the iterator is indefinite.
 *
 * **See also:**
 *
 * - {@link dropWhile}
 * - {@link slice}
 * - {@link take}
 *
 * @template A - The item type
 * @param {number} n - The number of items to drop
 * @returns {(items: Iterable<A>) => Generator<A, void>}
 */
export default function drop(n) {
  if (n < 0) {
    return function* (items) {
      const iter = items[Symbol.iterator]();
      /** @type {A[]} */
      const buffer = [];

      for (let i = 0; i < -n; i += 1) {
        const { value, done } = iter.next();

        if (done) {
          return;
        }

        buffer.push(value);
      }

      try {
        let i = 0;
        let next = iter.next();

        while (!next.done) {
          yield buffer[i];

          buffer[i] = next.value;
          i = (i + 1) % buffer.length;
          next = iter.next();
        }
      } finally {
        if (typeof iter.return === "function") {
          iter.return();
        }
      }
    };
  }

  return function* (items) {
    const iter = items[Symbol.iterator]();

    for (let i = 0; i < n; i += 1) {
      const { done } = iter.next();

      if (done) {
        return;
      }
    }

    try {
      let next = iter.next();

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
