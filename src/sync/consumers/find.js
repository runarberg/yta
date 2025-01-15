/**
 * Consume the iterator and return the first item where the predicate function
 * returns true.
 *
 * ```js
 * import { pipe } from "yta";
 * import { find, of } from "yta/sync";
 *
 * pipe(
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
 * @returns {(items: Iterable<A>) => A | undefined}
 */
export default function find(p) {
  return (items) => {
    for (const item of items) {
      if (p(item)) {
        return item;
      }
    }
  };
}
