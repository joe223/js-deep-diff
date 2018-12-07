# js-deep-diff

> An lightly library for comparing two javascript object structure, 1kb after gziped.

<a href="https://travis-ci.com/joe223/js-deep-diff">
  <img src="https://travis-ci.com/joe223/js-deep-diff.svg?branch=master"/>
</a>
<a href="https://codecov.io/gh/joe223/js-deep-diff">
  <img src="https://codecov.io/gh/joe223/js-deep-diff/branch/master/graph/badge.svg" />
</a>
<a href="https://npmjs.com/js-deep-diff">
  <img src="https://img.shields.io/npm/v/js-deep-diff/latest.svg"/>
</a>

## Install

```shell
$ npm install js-deep-diff
$ yarn add js-deep-diff
```

## Notice

Something you should know is that：

- `new String('string')` is **NOT** equal to `'string'`
- `new Number(1)` is **NOT** equal to `1`
- `new Boolean(false)` is **NOT** equal to `false`
- `{0: 1}` is **NOT** equal to `[1]`
- `new RegExp('\\s')` is **EQUAL** to `/\s/`
- `new Date("1970-01-01T00:00:00.000Z")` is **EQUAL** to `new Date("Thu, 01 Jan 1970 00:00:00 GMT")`

although `js-deep-diff` is using `Object.keys` for diff action.

It's different with `deep-object-diff` and some library else. ([deep-object-diff]() regard `{0: 1}` as `[1]`).

## Benchmark

|[js-deep-diff](https://npmjs.com/js-deep-diff)|[deep-diff](https://npmjs.com/deep-diff)|[deep-object-diff](https://npmjs.com/deep-object-diff)|
|---|---|---|
|7.09278ms | 8.11372ms | 3.347934ms|

## Usage

```javascript
const diff = require('js-deep-diff')

const lhs = {
  name: 'my object',
  description: 'it\'s an object!',
  test: 'test',
  details: {
    it: 'has',
    an: 'array',
    with: ['a', 'few', 'elements']
  }
}

const rhs = {
  name: 'updated object',
  description: 'it\'s an object!',
  details: {
    it: 'has',
    an: 'array',
    with: ['a', 'few', 'more', 'elements', {
      than: 'before'
    }]
  }
}

diff(lhs, rhs)
```

Then got the differences:

```json
[
    {
        "type": "EDIT",
        "path": [
            "name"
        ],
        "lhs": "my object",
        "rhs": "updated object"
    },
    {
        "type": "DEL",
        "path": [
            "test"
        ],
        "lhs": "test"
    },
    {
        "type": "EDIT",
        "path": [
            "details",
            "with",
            2
        ],
        "lhs": "elements",
        "rhs": "more"
    },
    {
        "type": "ADD",
        "path": [
            "details",
            "with",
            3
        ],
        "rhs": "elements"
    },
    {
        "type": "ADD",
        "path": [
            "details",
            "with",
            4
        ],
        "rhs": {
            "than": "before"
        }
    }
]
```
