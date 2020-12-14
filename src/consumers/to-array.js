/**
 * Collect the iterator into an array.
 *
 * ```js
 * import { pipe, range, toArray } from "andcetera";
 *
 * pipe(range(5), toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * @template A
 * @returns {(items: Iterable<A>) => A[]}
 */
export default function toArray() {
  return (items) => [...items];
}
