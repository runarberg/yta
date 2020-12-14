/**
 * Create a pipeline for chaining iterator with operators.
 *
 * ```js
 * import { drop, filter, map, pipe, range, reduce, take } from "andcetera";
 *
 * pipe(
 *   range(),
 *   drop(10),
 *   filter((x) => x % 2 === 0),
 *   map((x) => x * 2),
 *   take(5),
 *   reduce((sum, x) => sum + x, 0),
 * );
 * // => 140
 * ```
 *
 * @template S
 * @template R
 * @template {((source: any) => any)[]} Fns
 * @param {S} source
 * @param {[(source: S) => any, ...Fns, (source: any) => R]} fns
 * @returns {R}
 */
export default function pipe(source, ...fns) {
  // @ts-ignore
  return fns.reduce((value, fn) => fn(value), source);
}
