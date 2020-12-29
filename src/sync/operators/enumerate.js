import { range, zip } from "../index.js";

/**
 * Map the iterator into enumerated pairs.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { enumerate, of, toArray } from "andcetera/sync";
 *
 * pipe(of("a", "b", "c"), enumerate(), toArray());
 * // => [[0, "a"], [1, "b"], [2, "c"]]
 * ```
 *
 * @template A The item type
 * @returns {(items: Iterable<A>) => Generator<[number, A], void>}
 */
export default function enumerate() {
  return (items) => zip(range(), items);
}
