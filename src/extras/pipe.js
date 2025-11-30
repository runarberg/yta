/* eslint-disable jsdoc/reject-any-type */
/**
 * @typedef {(a: any) => any} AnyFn
 */
/* eslint-enable jsdoc/reject-any-type */

/* eslint-disable jsdoc/valid-types */
/**
 * @template Ts
 * @typedef {Ts extends [...infer _, infer T] ? T : never} Last
 */
/* eslint-enable jsdoc/valid-types */

/**
 * Create a pipeline for chaining iterator with operators.
 *
 * ```js
 * import { pipe } from "yta";
 * import { drop, filter, map, range, reduce, take } from "yta/sync";
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
 * @template Source
 * @overload
 * @param {Source} source
 * @returns {Source}
 */
/**
 * @template Source
 * @template A
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @returns {A}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @returns {B}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @returns {C}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @returns {D}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @returns {E}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @param {(e: E) => F} fnF
 * @returns {F}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @param {(e: E) => F} fnF
 * @param {(f: G) => G} fnG
 * @returns {G}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @template H
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @param {(e: E) => F} fnF
 * @param {(f: G) => G} fnG
 * @param {(g: G) => H} fnH
 * @returns {H}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @template H
 * @template I
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @param {(e: E) => F} fnF
 * @param {(f: G) => G} fnG
 * @param {(g: G) => H} fnH
 * @param {(h: H) => I} fnI
 * @returns {I}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @template H
 * @template I
 * @template J
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @param {(e: E) => F} fnF
 * @param {(f: G) => G} fnG
 * @param {(g: G) => H} fnH
 * @param {(h: H) => I} fnI
 * @param {(i: I) => J} fnJ
 * @returns {J}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @template H
 * @template I
 * @template J
 * @template K
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @param {(e: E) => F} fnF
 * @param {(f: G) => G} fnG
 * @param {(g: G) => H} fnH
 * @param {(h: H) => I} fnI
 * @param {(i: I) => J} fnJ
 * @param {(j: J) => K} fnK
 * @returns {K}
 */
/**
 * @template Source
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @template H
 * @template I
 * @template J
 * @template K
 * @template L
 * @overload
 * @param {Source} source
 * @param {(source: Source) => A} fnA
 * @param {(a: A) => B} fnB
 * @param {(b: B) => C} fnC
 * @param {(c: C) => D} fnD
 * @param {(d: D) => E} fnE
 * @param {(e: E) => F} fnF
 * @param {(f: G) => G} fnG
 * @param {(g: G) => H} fnH
 * @param {(h: H) => I} fnI
 * @param {(i: I) => J} fnJ
 * @param {(j: J) => K} fnK
 * @param {(k: K) => L} fnL
 * @returns {L}
 */
/**
 * @template Source
 * @template {AnyFn[]} Fns
 * @param {Source} source
 * @param {AnyFn[]} fns
 * @returns {ReturnType<Last<Fns>>}
 */
export default function pipe(source, ...fns) {
  // @ts-ignore
  return fns.reduce((value, fn) => fn(value), source);
}
