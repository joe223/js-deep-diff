const deepdiff = require('deep-diff')
const deepObjectDiff = require('deep-object-diff').diff
const diff = require('./diff')
const a = require('./a')
const b = require('./b')

const NS_PER_SEC = 1e9;

var lhs = {
  name: 'my object',
  description: 'it\'s an object!',
  test: 'tt',
  details: {
    it: 'has',
    an: 'array',
    with: ['a', 'few', 'elements']
  }
}

var rhs = {
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

function _diff(name, fn, repeat = 100) {
  const res = []

  for (let i = 0; i < repeat; i++) {
    const start = process.hrtime()
    // fn(lhs, rhs)
    fn(a, b)
    const diff = process.hrtime(start)
    res.push(diff[0] * NS_PER_SEC + diff[1])
  }

  const total = res.reduce((prev, next) => prev + next, 0)

  return {
    name,
    took: `${total / 10e5 /res.length}ms`,
    times: res.length
  }
}

console.log([
  _diff('diff:', diff, 100),
  _diff('deepdiff:', deepdiff, 100),
  _diff('deepObjectDiff:', deepObjectDiff, 100)
])

console.log(JSON.stringify(diff(lhs, rhs), null, 4))
