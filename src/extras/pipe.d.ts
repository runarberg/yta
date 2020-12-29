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
 */
declare function pipe<S>(source: S): S;
declare function pipe<S, R>(source: S, fn: (s: S) => R): R;
declare function pipe<S, U1, R>(
  source: S,
  fn1: (s: S) => U1,
  fn2: (s: U1) => R,
): R;

declare function pipe<S, U1, U2, R>(
  source: S,
  fn1: (s: S) => U1,
  fn2: (s: U1) => U2,
  fn3: (s: U2) => R,
): R;

declare function pipe<S, U1, U2, U3, R>(
  source: S,
  fn1: (s: S) => U1,
  fn2: (s: U1) => U2,
  fn3: (s: U2) => U3,
  fn4: (s: U3) => R,
): R;

declare function pipe<S, U1, U2, U3, U4, R>(
  source: S,
  fn1: (s: S) => U1,
  fn2: (s: U1) => U2,
  fn3: (s: U2) => U3,
  fn4: (s: U3) => U4,
  fn5: (s: U4) => R,
): R;

declare function pipe<S, U1, U2, U3, U4, U5, R>(
  source: S,
  fn1: (s: S) => U1,
  fn2: (s: U1) => U2,
  fn3: (s: U2) => U3,
  fn4: (s: U3) => U4,
  fn5: (s: U4) => U5,
  fn6: (s: U5) => R,
): R;

declare function pipe<S, R, Fns extends readonly ((source: any) => any)[]>(
  source: S,
  ...fns: [(source: S) => any, ...Fns, (source: any) => R]
): R;

export default pipe;
