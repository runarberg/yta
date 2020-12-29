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

Or if you use the [proposed pipeline operator][proposal/pipeline-operator]:

```js
import { aside, drop, map, range, reduce, take } from "andcetera/sync";

// Sum of the first five squares and log them to the console as they pass by.
range()
  |> drop(1)
  |> take(5)
  |> map((n) => n ** 2)
  |> aside((square) => console.log(square))
  |> reduce((sum, square) => sum + square, 0);
// => 55
// Logs 1, 4, 9, 16, 25
```

[npm/itertools]: https://www.npmjs.com/package/itertools
[proposal/pipeline-operator]: https://github.com/tc39/proposal-pipeline-operator
