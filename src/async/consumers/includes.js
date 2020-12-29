import some from "./some.js";

/**
 * Consumes the iterator into true if the item is in the sequence.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { includes, of } from "andcetera/async";
 *
 * await pipe(of(1, 3, 5), includes(3));
 * // => true
 *
 * await pipe(of("foo", "bar", "baz"), includes("quux"));
 * // => false
 * ```
 *
 * @template A
 * @param {A} target
 * @returns {(items: AsyncIterable<A>) => Promise<boolean>}
 */
export default function includes(target) {
  return some((item) => item === target);
}
