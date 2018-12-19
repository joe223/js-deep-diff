const deepdiff = require('deep-diff')
const deepObjectDiff = require('deep-object-diff').diff
const diff = require('../diff')({enableDeleteAction: false})
const a = require('./a')
const b = require('./b')

const NS_PER_SEC = 1e9;

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
    time: `${total / 10e5 /res.length}ms`,
    times: res.length
  }
}

console.log([
  _diff('diff', diff, 100),
  _diff('deepdiff', deepdiff, 100),
  _diff('deepObjectDiff', deepObjectDiff, 100)
].map(item => `${item.name}: Average time is ${item.time} in ${item.times} times.`).join('\r\n'))

// console.log(JSON.stringify(diff(lhs, rhs), null, 4))
