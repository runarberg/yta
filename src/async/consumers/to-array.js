/**
 * Collect the iterator into a promise of an array.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { asAsync, range } from "andcetera/sync";
 * import { toArray } from "andcetera/async";
 *
 * await pipe(range(5), asAsync(), toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * @template A
 * @returns {(items: AsyncIterable<A>) => Promise<A[]>}
 */
export default function toArray() {
  return async function (items) {
    /** @type {A[]} */
    const arr = [];

    for await (const item of items) {
      arr.push(item);
    }

    return arr;
  };
}
