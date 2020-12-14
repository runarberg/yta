/**
 * Create an iterator of iterators that repeats n times (defaults to indefinetly).
 *
 * ```js
 * import { pipe, range, repeat, take, toArray } from "andcetera";
 *
 * pipe(
 *   repeat(() => pipe(range(), take(3))),
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
 * import { of, pipe, repeat, toArray } from "andcetera";
 *
 * pipe(
 *   repeat(() => of(1, -1), 3),
 *   map(toArray()),
 *   toArray(),
 * );
 * // => [[1, -1], [1, -1], [1, -1]]
 * ```
 *
 * **See also:**
 *
 * * [[`cycle`]]
 * * [[`flatRepeat`]]
 *
 * @template A
 * @param {() => Iterable<A>} generator
 * @param {number} [times]
 * @returns {Iterable<Iterable<A>>}
 */
export default function* repeat(generator, times = Number.POSITIVE_INFINITY) {
  for (let i = 0; i < times; i += 1) {
    yield generator();
  }
}
