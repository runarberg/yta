import at from "./at.js";

/**
 * Get the first element of the sequence or `undefined` if sequence is empty.
 *
 * ```js
 * import { pipe } from "yta";
 * import { first, of } from "yta/async";
 *
 * pipe(of("foo", "bar", "baz", "quux"), first());
 * // => "foo"
 * ```
 *
 * **See also:**
 *
 * - {@link at}
 * - {@link last}
 *
 * @template A
 * @returns {(items: AsyncIterable<A>) => Promise<A | undefined>}
 */
export default function first() {
  return at(0);
}
