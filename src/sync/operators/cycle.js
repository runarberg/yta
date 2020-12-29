/**
 * Create a cycle of an iterator such that when finished with one run, start the
 * same sequence over.
 *
 * Note that the items are internally buffered, which might be problematic for
 * long iterators (especially infinite ones). Consider using [[`repeat`]] or
 * [[`flatRepeat`]] if you can.
 *
 * ```js
 * import { pipe } from "andcetera";
 * import { cycle, of, take } from "andcetera/sync";
 *
 * pipe(of(1, -1), cycle(), take(5), toArray());
 * // => [1, -1, 1, -1, 1]
 * ```
 *
 * **See also:**
 *
 * * [[`repeat`]]
 * * [[`flatRepeat`]]
 *
 * @template A The item type
 * @returns {(items: Iterable<A>) => Generator<A, void>}
 */
export default function cycle() {
  /** @type A[] */
  const buffer = [];

  return function* (items) {
    for (const item of items) {
      yield item;

      buffer.push(item);
    }

    while (true) {
      for (const item of buffer) {
        yield item;
      }
    }
  };
}
