/**
 * Consume the iterator and return the first item where the predicate function
 * returns true.
 *
 * ```js
 * import { pipe } from "yta";
 * import { find, of } from "yta/async";
 *
 * await pipe(
 *   of(
 *     { name: "foo", value: 42 },
 *     { name: "bar", value: 5 },
 *     { name: "baz", value: 101 },
 *   ),
 *   find(({ name }) => name === "bar"),
 * );
 * // => { name: bar, value: 101 }
 * ```
 *
 * @template A
 * @param {(item: A) => boolean} p The predicate function
 * @returns {(items: AsyncIterable<A>) => Promise<A | undefined>}
 */
export default function find(p) {
  return async (items) => {
    for await (const item of items) {
      if (p(item)) {
        return item;
      }
    }
  };
}
