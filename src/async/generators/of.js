/**
 * Create an async iterator by resolving each of the arguments in order.
 *
 * ```js
 * import { of } from "yta";
 *
 * const arr = [];
 * const items = of(
 *   Promise.resolve("a"),
 *   Promise.resolve("b"),
 *   Promise.resolve("c"),
 * );
 *
 * for await (item of items) {
 *   arr.push(item);
 * }
 *
 * arr;
 * // => ["a", "b", "c"]
 * ```
 *
 * @template T
 * @param {(T | Promise<T>)[]} items
 * @returns {AsyncIterable<T>}
 */
export default async function* of(...items) {
  for (const item of items) {
    yield await item;
  }
}
