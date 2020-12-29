/**
 * Turns an iterator of promises into an async iterator. Handy if you
 * need to map items into async results, or if you have an array of
 * promises and want to iterate through the results.
 *
 * ```js
 * import { async, pipe, sync } from "andcetera";
 * import { asAsync } from "andcetera/sync";
 *
 * await pipe(sync.range(5), asAsync(), async.toArray());
 * // => [0, 1, 2, 3, 4]
 * ```
 *
 * @template A
 * @returns {(items: Iterable<A | Promise<A>>) => AsyncGenerator<A, void>}
 */
export default function asAsync() {
  return async function* (items) {
    for (const item of items) {
      yield await item;
    }
  };
}
