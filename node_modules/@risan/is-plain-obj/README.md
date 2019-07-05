# Is Plain Object

[![Build Status](https://badgen.net/travis/risan/is-plain-obj)](https://travis-ci.org/risan/is-plain-obj)
[![Test Covarage](https://badgen.net/codecov/c/github/risan/is-plain-obj)](https://codecov.io/gh/risan/is-plain-obj)
[![Greenkeeper](https://badges.greenkeeper.io/risan/is-plain-obj.svg)](https://greenkeeper.io)
[![Latest Version](https://badgen.net/npm/v/@risan/is-plain-obj)](https://www.npmjs.com/package/@risan/is-plain-obj)

Check if a value is a plain JavaScript object

## Installation

```bash
$ npm install @risan/is-plain-obj
```

### CDN

The library is available over a CDN:

```html
<script src="https://unpkg.com/@risan/is-plain-obj@latest/dist/is-plain-obj.umd.js"></script>

<!-- Or the minified version -->
<script src="https://unpkg.com/@risan/is-plain-obj@latest/dist/is-plain-obj.umd.min.js"></script>
```

## Usage

```js
const isPlainObj = require("@risan/is-plain-obj");

// The following statements will return TRUE:
isPlainObj({});
isPlainObj({ foo: "bar" });
isPlainObj(new Object());
isPlainObj(Object.create(null));
isPlainObj(Object.create({}));

// The following statements will return FALSE:
isPlainObj(undefined);
isPlainObj(null);
isPlainObj(true);
isPlainObj(3.14);
isPlainObj(NaN);
isPlainObj(Infinity);
isPlainObj("foo");
isPlainObj([1, 2, 3]);
isPlainObj(new Date());
isPlainObj(new Set([1, 2, 3]));
isPlainObj(new Map());
isPlainObj(new WeakMap());
isPlainObj(parseInt);

class Person {}
isPlainObj(new Person()); // FALSE

const myFunction = () => "foo";
isPlainObj(myFunction); // FALSE
```

If you load the library directly on the browser, it's available under the `isPlainObj` name.

```js
window.isPlainObj({ foo: "bar" }); // TRUE

window.isPlainObj(new Date()); // FALSE
```

## License

[MIT](https://github.com/risan/is-plain-obj/blob/master/LICENSE) © [Risan Bagja Pradana](https://bagja.net)
