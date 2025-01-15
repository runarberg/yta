import { asAsync, range } from "../../sync/index.js";
import { zip } from "../index.js";

/**
 * Map the iterator into enumerated pairs.
 *
 * ```js
 * import { pipe } from "yta";
 * import { enumerate, of, toArray } from "yta/async";
 *
 * pipe(of("a", "b", "c"), enumerate(), toArray());
 * // => [[0, "a"], [1, "b"], [2, "c"]]
 * ```
 *
 * @template A - The item type
 * @returns {(items: AsyncIterable<A>) => AsyncGenerator<[number, A], void>}
 */
export default function enumerate() {
  return (items) => zip(asAsync()(range()), items);
}
