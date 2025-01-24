/**
 * Generate a sequence of numbers between `start` and `stop` (start inclusive;
 * stop non-inclusive). If `stop` is not specified generate `start` many
 * number starting at 0. If `start` is not specified generate an infinitly long
 * sequences starting at 0.
 *
 * ```js
 * import { pipe } from "yta";
 * import { range, take, toArray } from "yta/sync";
 *
 * pipe(range(), take(5), toArray());
 * // => [0, 1, 2, 3, 4]
 *
 * [...range(5)];
 * // => [0, 1, 2, 3, 4]
 *
 * [...range(10, 13)];
 * // => [10, 11, 12]
 *
 * [...range(42, 50, 3)];
 * // => [42, 45, 48]
 *
 * [...range(15, 10, -1)];
 * // => [15, 14, 13, 12, 11]
 * ```
 *
 * @param {number} [start] - The starting number (inclusive) or sequence length
 *     if `stop` is not specified
 * @param {number} [stop] - The stopping number (non-inclusive)
 * @param {number} [step] - The step increment.
 * @returns {Generator<number, void>}
 */
export default function* range(start, stop, step = 1) {
  let begin = start;
  let end = stop;

  if (typeof begin === "undefined") {
    end = Number.POSITIVE_INFINITY;
    begin = 0;
  }

  if (typeof end === "undefined") {
    end = begin;
    begin = 0;
  }

  /** @type {(a: number, b: number) => boolean} */
  const cmp = begin <= end ? (a, b) => a < b : (a, b) => b < a;

  for (let i = begin; cmp(i, end); i += step) {
    yield i;
  }
}
