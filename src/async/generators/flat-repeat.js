import pipe from "../../extras/pipe.js";
import flat from "../operators/flat.js";

import repeat from "./repeat.js";

/**
 * Create an iterator that repeats n times (defaults to indefinitely). After
 * finishing one run a new iterator will be created from the generator and
 * amended to the sequence. It is the same as running {@link repeat} on a
 * generator and then {@link flat}.
 *
 * ```js
 * import { pipe } from "yta";
 * import { flatRepeat, of, take, toArray } from "yta/async";
 *
 * pipe(
 *   flatRepeat(() => of(1, -1)),
 *   take(5),
 *   toArray(),
 * );
 * // => [1, -1, 1, -1, 1]
 * ```
 *
 * If you provide `n` as a second argument, repeat the sequence `n` many times.
 *
 * ```js
 * import { pipe } from "yta";
 * import { flatRepeat, of, toArray } from "yta/async";
 *
 * await pipe(
 *   flatRepeat(() => of(1, -1), 3),
 *   toArray(),
 * );
 * // => [1, -1, 1, -1, 1, -1]
 * ```
 *
 * **See also:**
 *
 * - {@link flat}
 * - {@link repeat}
 *
 * @template A
 * @param {() => AsyncIterable<A>} generator
 * @param {number} [times]
 * @returns {AsyncIterable<A>}
 */
export default function flatRepeat(
  generator,
  times = Number.POSITIVE_INFINITY,
) {
  return pipe(repeat(generator, times), flat());
}
