import at from "./at.js";

/**
 * Get the first element of the sequence or `undefined` if sequence is empty.
 *
 * ```js
 * import { first, of, pipe } from "andcetera";
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
 * @returns {(items: Iterable<A>) => A | undefined}
 */
export default function first() {
  return at(0);
}
