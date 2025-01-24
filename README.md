# Ýta

[![ci](https://github.com/runarberg/yta/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/runarberg/yta/actions/workflows/ci.yml)
![Coverage](https://runarberg.github.io/yta/coverage-badge.svg)
[![License](https://img.shields.io/npm/l/yta)](https://github.com/runarberg/yta/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/yta)](https://npm-stat.com/charts.html?package=yta)

> Tools to further your iterator pipelines

Ýta (pronounced /itʰaː/ eat-ah; meaning bulldozer in Icelandic) is an
iterable helper library (similar to [itertools][npm/itertools])
designed for pipelines. Every operator is a function that returns a
function that consumes a passed in iterable, operate on its iterator
and returns another iterable, thus continuing down the pipeline.

Along with _operators_, this library provides handy _generators_ which
return an iterable to start a pipeline, _combinators_ to merge two or
more iterables into a single pipeline, and _consumers_ to end the
pipeline and return a value.

```js
import { pipe } from "yta";
import { map, pipe, range, reduce } from "yta/sync";

// Sum of the first five squares.
pipe(
  range(1, 6),
  map((n) => n ** 2),
  reduce((sum, square) => sum + square, 0),
);
// => 55
```

## Documentation

https://runarberg.github.io/yta/
