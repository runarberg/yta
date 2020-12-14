import { range, zip } from "../index.js";

/**
 * Map the iterator into enumerated pairs.
 *
 * ```js
 * import { enumerate, of, pipe, toArray } from "andcetera";
 *
 * pipe(of("a", "b", "c"), enumerate(), toArray());
 * // => [[0, "a"], [1, "b"], [2, "c"]]
 * ```
 *
 * @template A The item type
 * @returns {(items: Iterable<A>) => Iterable<[number, A]>}
 */
export default function enumerate() {
  return (items) => zip(range(), items);
}
