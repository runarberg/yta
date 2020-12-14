/**
 * Consume the iterator performing a side effect on each item in the sequence.
 *
 * ```js
 * import { forEach, pipe, range } from "andcetera";
 *
 * pipe(
 *   range(5),
 *   forEach((n) => console.log(n)),
 * );
 * // logs 0, 1, 2, 3, 4
 * ```
 *
 * **See also:**
 *
 * * [[`aside`]]
 *
 * @template A
 * @param {(item: A) => void} fn The side effect function
 * @returns {(items: Iterable<A>) => void}
 */
export default function forEach(fn) {
  return (items) => {
    for (const item of items) {
      fn(item);
    }
  };
}
