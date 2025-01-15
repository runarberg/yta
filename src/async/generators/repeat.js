/**
 * Create an iterator of iterators that repeats n times (defaults to indefinetly).
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, repeat, take, toArray } from "yta/async";
 * import { asAsync, range } from "yta/sync";
 *
 * await pipe(
 *   repeat(() => pipe(range(), asAsync(), take(3))),
 *   take(4),
 *   map(toArray()),
 *   toArray(),
 * );
 * // => [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]
 * ```
 *
 * If you provide `n` as a second argument, repeat the sequence `n` many times.
 *
 * ```js
 * import { pipe } from "yta";
 * import { of, repeat, toArray } from "yta/async";
 *
 * await pipe(
 *   repeat(() => of(1, -1), 3),
 *   map(toArray()),
 *   toArray(),
 * );
 * // => [[1, -1], [1, -1], [1, -1]]
 * ```
 *
 * **See also:**
 *
 * - {@link flatRepeat}
 *
 * @template A
 * @template {AsyncIterable<A>} I
 * @param {() => I} generator
 * @param {number} [times]
 * @returns {AsyncGenerator<I, void>}
 */
export default async function* repeat(
  generator,
  times = Number.POSITIVE_INFINITY,
) {
  for (let i = 0; i < times; i += 1) {
    yield generator();
  }
}
