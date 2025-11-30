/**
 * Collect the items of the iterator into a map of arrays keyed by the return
 * value of your key generator function.
 *
 * Optionally pass a map function which will map the inner values.
 *
 * Note we return a `Map` which natively implements `Symbol.iterator` which
 * means you are free to chain another operator after it’s consumed.
 *
 * ```js
 * import { pipe } from "yta";
 * import { group-by, of } from "yta/sync";
 *
 * pipe(
 *   of(
 *     { name: "foo", value: 5 },
 *     { name: "foo", value: 42 },
 *     { name: "bar", value: 101 },
 *     { name: "foo", value: 13 },
 *     { name: "bar", value: 2 },
 *   ),
 *   groupBy(
 *     ({ name }) => name,
 *     ({ value }) => value,
 *   ),
 *   Object.fromEntries,
 * );
 * // => { "foo": [5, 42, 13], "bar": [101, 2] }
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
 * @returns {(items: Iterable<A>) => Map<K, B[]>}
 */
export default function groupBy(getKey, mapFn) {
  return (items) => {
    /** @type {Map<K, B[]>} */
    const map = new Map();

    for (const item of items) {
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
