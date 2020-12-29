import at from "./at.js";

/**
 * Get the first element of the sequence or `undefined` if sequence is empty.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { first, of } from "andcetera/async";
 *
 * pipe(of("foo", "bar", "baz", "quux"), first());
 * // => "foo"
 * ```
 *
 * **See also:**
 *
 * * [[`at`]]
 * * [[`last`]]
 *
 * @template A
 * @returns {(items: AsyncIterable<A>) => Promise<A | undefined>}
 */
export default function first() {
  return at(0);
}
