/**
 * Generate a sequence with a recurrent relationship by applying a function
 * to the previous state. Similar to [[`accumulate`]] but generates a new
 * sequence from scratch.
 *
 * ```js
 * import { map, pipe, recurrent, take, toArray } from "andcetera";
 *
 * pipe(
 *   recurrent(([a, b]) => [b, a + b], [0, 1]),
 *   take(11),
 *   map(([a]) => a),
 *   toArray(),
 * );
 * // => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
 * ```
 *
 * @template A
 * @param {(state: A) => A} fn
 * @param {A} init
 */
export default function* recurrent(fn, init) {
  let state = init;

  yield state;

  while (true) {
    state = fn(state);

    yield state;
  }
}
