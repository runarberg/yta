/**
 * @template A
 * @template B
 * @template R
 * @param {(x: A) => R} a
 * @param {(x: B) => A} b
 * @returns {(x: B) => R}
 */
export function compose(a, b) {
  return (x) => a(b(x));
}
