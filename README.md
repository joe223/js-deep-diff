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

Something you should know before using：

- `new String('string')` is **NOT** equivalent to `'string'`
- `new Number(1)` is **NOT** equivalent to `1`
- `new Boolean(false)` is **NOT** equivalent to `false`
- `{0: 1}` is **NOT** equivalent to `[1]`
- `new RegExp('\\s')` is **EQUIVALENT** to `/\s/`
- `new Date("1970-01-01T00:00:00.000Z")` is **EQUIVALENT** to `new Date("Thu, 01 Jan 1970 00:00:00 GMT")`

It's different with `deep-object-diff` and some library else. ([deep-object-diff]() regard `{0: 1}` as `[1]`).

## Usage

```javascript
const diff = require('js-deep-diff')

const lhs = {
  name: 'my object',
  description: 'it\'s an object!',
  details: {
    it: 'has',
    an: 'array',
    with: ['a', 'few', 'elements']
  },
  others: {
    distance: 0,
    hight: 1
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
  },
  others: {
    distance: 0
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
    },
    {
        "type": "EDIT",
        "path": [
            "others"
        ],
        "lhs": {
            "distance": 0,
            "hight": 1
        },
        "rhs": {
            "distance": 0
        }
    }
]
```

## Configuration

### enableDeleteAction `default: false`

```diff
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
    },
    {
        "type": "EDIT",
        "path": [
            "others"
        ],
        "lhs": {
            "distance": 0,
            "hight": 1
        },
        "rhs": {
            "distance": 0
        }
    },
+   {
+       "type": "DEL",
+       "path": [
+           "others",
+           "hight"
+       ],
+       "lhs": 1
+   }
]
```
## Test

```shell
$ npm run test
```

  diff
    ✓ Same value
    ✓ Empty value: null
    ✓ Empty value: undefind
    ✓ Date
    ✓ Boolean
    ✓ Number
    ✓ String
    ✓ RegExp
    ✓ Pirmitive value
    ✓ Add action in array
    ✓ Edit action in array
    ✓ Delete action in array
    ✓ Add action in object
    ✓ Delete action in object
    ✓ Edit action in object
    ✓ Nested object
    ✓ enableDeleteAction: Array
    ✓ enableDeleteAction: Object


  18 passing (26ms)

## Coverage

```shell
$ npm run test:coverage
```

    Statements   : 100% ( 56/56 )
    Branches     : 58.7% ( 27/46 )
    Functions    : 100% ( 16/16 )
    Lines        : 100% ( 56/56 )

## Benchmark

|[js-deep-diff](https://npmjs.com/js-deep-diff)|[deep-diff](https://npmjs.com/deep-diff)|[deep-object-diff](https://npmjs.com/deep-object-diff)|
|---|---|---|
|5.36937ms | 5.87379ms | 3.06766ms|
