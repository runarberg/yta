# &cetera

> Functional iterator helpers

&cetera (pronounced _andcetera_) is an iterable helper library
(similar to [itertools][npm/itertools]) but with a functional
twist. Every operator is a function that returns a function that
consumes a passed in iterable, operate on its iterator and returns
another iterable. This is optimized to be used in pipelines.

```js
import { map, pipe, range, reduce } from "andcetera";

// Sum of the first five squares.
pipe(
  range(1, 6),
  map((n) => n ** 2),
  reduce((sum, square) => sum + square, 0),
);
// => 55
```
