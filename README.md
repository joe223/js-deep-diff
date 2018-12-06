# js-deep-diff

![js-deep-diff](https://travis-ci.com/joe223/js-deep-diff.svg?branch=master)
![js-deep-diff](https://codecov.io/gh/joe223/js-deep-diff/branch/dev/graph/badge.svg)
![js-deep-diff](https://img.shields.io/npm/l/js-deep-diff.svg)

```javascript
const diff = require('js-deep-diff')

const lhs = {
  name: 'my object',
  description: 'it\'s an object!',
  test: 'tt',
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

got the differences:

```javascript
[
    {
        "type": "EDIT",
        "path": [
            "name"
        ],
        "value": "updated object"
    },
    {
        "type": "DEL",
        "path": [
            "test"
        ],
        "value": "tt"
    },
    {
        "type": "EDIT",
        "path": [
            "details",
            "with",
            2
        ],
        "value": "more"
    },
    {
        "type": "ADD",
        "path": [
            "details",
            "with",
            3
        ],
        "value": "elements"
    },
    {
        "type": "ADD",
        "path": [
            "details",
            "with",
            4
        ],
        "value": {
            "than": "before"
        }
    }
]
```
