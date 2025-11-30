/**
 * Collect the items of the iterator into a map of arrays keyed by the return
 * value of your key generator function.
 *
 * ```js
 * import { pipe } from "yta";
 * import { groupBy, of } from "yta/async";
 *
 * await pipe(
 *   of(5, 42, 101, 13, 2)
 *   groupBy((n) => (n % 2 === 0 ? "even" : "odd")),
 *   async (entries) => Object.fromEntries(await entries),
 * );
 * // => { "odd": [5, 101, 13], "even": [42, 2] }
 * ```
 *
 * **See also:**
 *
 * [The native `Map` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 *
 * @template A
 * @template K
 * @template [B=A]
 * @param {(item: A) => K} getKey
 * @param {(item: A) => B} [mapFn]
 * @returns {(items: AsyncIterable<A>) => Promise<Map<K, B[]>>}
 */
export default function groupBy(getKey, mapFn) {
  return async (items) => {
    /** @type {Map<K, B[]>} */
    const map = new Map();

    for await (const item of items) {
      const key = getKey(item);
      let values = map.get(key);

      if (!values) {
        values = [];
        map.set(key, values);
      }

      values.push(/** @type {B} */ (mapFn ? mapFn(item) : item));
    }

    return map;
  };
}
