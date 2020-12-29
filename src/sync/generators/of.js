/**
 * Create an iterator from each of the arguments.
 *
 * ```js
 * import { of } from "andcetera/sync";
 *
 * const arr = [];
 *
 * for (item of of("a", "b", "c")) {
 *   arr.push(item);
 * }
 *
 * arr;
 * // => ["a", "b", "c"]
 * ```
 *
 * @template T
 * @param {T[]} items
 * @returns {Generator<T, void>}
 */
export default function* of(...items) {
  for (const item of items) {
    yield item;
  }
}
