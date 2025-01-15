import some from "./some.js";

/**
 * Consumes the iterator into true if the item is in the sequence.
 *
 * ```js
 * import { pipe } from "yta";
 * import { includes, of } from "yta/sync";
 *
 * pipe(of(1, 3, 5), includes(3));
 * // => true
 * ```
 *
 * ```js
 * import { includes, of, pipe } from "yta";
 *
 * pipe(of("foo", "bar", "baz"), includes("quux"));
 * // => false
 * ```
 *
 * @template A
 * @param {A} target
 * @returns {(items: Iterable<A>) => boolean}
 */
export default function includes(target) {
  return some((item) => item === target);
}
