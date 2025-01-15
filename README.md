# Ýta

> Tools to further your iterator pipelines

Ýta (pronounced /itʰaː/ eat-ah; meaning bulldozer in Icelandic) is an
iterable helper library (similar to [itertools][npm/itertools])
designed for pipelines. Every operator is a function that returns a
function that consumes a passed in iterable, operate on its iterator
and returns another iterable, thus continuing down the pipeline.

Along with *operators*, this library provides handy *generators* which
return an iterable to start a pipeline, *combinators* to merge two or
more iterables into a single pipeline, and *consumers* to end the
pipeline and return a value.

```js
import { map, pipe, range, reduce } from "yta";

// Sum of the first five squares.
pipe(
  range(1, 6),
  map((n) => n ** 2),
  reduce((sum, square) => sum + square, 0),
);
// => 55
```

## Generators

Generators return an iterable that you can use to start a pipeline.

* `flatRepeat` (sync, async)
* `fromEvent` (async)
* `of` (sync, async)
* `range` (sync)
* `recurrent` (sync, async)
* `repeat` (sync, async)

## Combinators

Combinators consume two or more iterables and combine them into a
single iterable.

* `chain` (sync, async)
* `zip` (sync, async)
* `zipLongest` (sync, async)

## Operators

Operators perform an operation on the items of the iterable, returning
a new iterator with new items.

Note that all operators are lazy.

* `accumulate` (sync, async)
* `asAsync` (sync)
* `aside` (sync, async)
* `cycle` (sync)
* `drop` (sync, async)
* `dropWhile` (sync, async)
* `enumerate` (sync, async)
* `filter` (sync, async)
* `flat` (sync, async)
* `flatMap` (sync, async)
* `map` (sync, async)
* `slice` (sync, async)
* `take` (sync, async)
* `takeWhile` (sync, async)
* `uniqueOn` (sync, async)

## Consumers

Consumers close the pipeline returning a single value when the
iteration has finished.

Note that some consumers (such as `groupBy`) return a collection of
items, such as maps or arrays, which are also iterables and can be
pushed down the pipeline. Unlike operators, however, these are not
lazy. Meaning the parent iterable needs to finish passing all its
items before consumers can push down their first item.

* `at` (sync, async)
* `count` (sync, async)
* `every` (sync, async)
* `find` (sync, async)
* `first` (sync, async)
* `forEach` (sync, async)
* `groupBy` (sync, async)
* `includes` (sync, async)
* `last` (sync, async)
* `reduce` (sync, async)
* `some` (sync, async)
* `toArray` (sync, async)

[npm/itertools]: https://www.npmjs.com/package/itertools
