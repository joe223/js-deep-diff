const diff = require('./diff')
const expect = require('expect')

describe('diff', () => {
  it('Same value', () => {
    var lhs = {
      name: 'diff',
      age: 1
    }

    var rhs = {
      name: 'diff',
      age: 1
    }
    expect(diff(lhs, rhs)).toEqual([])
  })

  it('Date', () => {
    var lhs = {
      time: new Date(0)
    }

    var rhs = {
      time: new Date(1)
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['time'],
      value: new Date(1),
      type: 'EDIT'
    }])
  })

  it('Boolean', () => {
    var lhs = {
      boolean1: new Boolean(true),
      boolean2: new Boolean(true)
    }

    var rhs = {
      boolean1: new Boolean(true),
      boolean2: new Boolean(false)
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['boolean2'],
      value: new Boolean(false),
      type: 'EDIT'
    }])
  })

  // it('Function', () => {
  //   var lhs = {
  //     fn() {
  //       return 1
  //     }
  //   }

  //   var rhs = {
  //     fn() {
  //       return 2
  //     }
  //   }
  //   expect(diff(lhs, rhs)).toEqual([{
  //     path: ['fn'],
  //     value: function fn () {
  //       return 2
  //     },
  //     type: 'EDIT'
  //   }])
  // })

  it('Number', () => {
    var lhs = {
      num1: new Number(1),
      num2: new Number(1),
    }

    var rhs = {
      num1: new Number(1),
      num2: new Number(2),
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['num2'],
      value: new Number(2),
      type: 'EDIT'
    }])
  })

  it('RegExp', () => {
    var lhs = {
      regexp1: new RegExp('\s'),
      regexp2: new RegExp('\s'),
    }

    var rhs = {
      regexp1: new RegExp('\s'),
      regexp2: new RegExp('\s+'),
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['regexp2'],
      value: new RegExp('\s+'),
      type: 'EDIT'
    }])
  })

  it('pirmitive', () => {
    var lhs = {
      name: 'joe',
      age: 1,
      checked: false
    }

    var rhs = {
      name: 'diff',
      age: '1',
      checked: true
    }
    expect(diff(lhs, rhs)).toEqual([{
        path: ['name'],
        value: 'diff',
        type: 'EDIT'
      },
      {
        path: ['age'],
        value: '1',
        type: 'EDIT'
      },
      {
        path: ['checked'],
        value: true,
        type: 'EDIT'
      }
    ])
  })

  it('Add action in array', () => {
    var lhs = {
      name: 'diff',
      group: [1, 2, 3, 4, 5]
    }

    var rhs = {
      name: 'diff',
      group: [1, 2, 3, 4, 5, 6]
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['group', 5],
      value: 6,
      type: 'ADD'
    }])
  })

  it('Edit action in array', () => {
    var lhs = {
      name: 'diff',
      group: [1, 2, 3, 4, 5]
    }

    var rhs = {
      name: 'diff',
      group: [1, 2, 1, 4, 5]
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['group', 2],
      value: 1,
      type: 'EDIT'
    }])
  })

  it('Delete action in array', () => {
    var lhs = {
      name: 'diff',
      group: [1, 2, 3, 4, 5, 6, 7]
    }

    var rhs = {
      name: 'diff',
      group: [1, 2, 3, 4, 5, 6]
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['group', 6],
      value: 7,
      type: 'DEL'
    }])
  })


  it('Add action in object', () => {
    var lhs = {
      group: [1, 2, 3, 4, 5]
    }

    var rhs = {
      name: 'diff',
      group: [1, 2, 3, 4, 5]
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['name'],
      value: 'diff',
      type: 'ADD'
    }])
  })

  it('Delete action in object', () => {
    var lhs = {
      name: 'diff',
      group: [1, 2, 3, 4, 5]
    }

    var rhs = {
      group: [1, 2, 3, 4, 5]
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['name'],
      value: 'diff',
      type: 'DEL'
    }])
  })

  it('Edit action in object', () => {
    var lhs = {
      group: [1, 2, 3, 4, 5]
    }

    var rhs = {
      group: null
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['group'],
      value: null,
      type: 'EDIT'
    }])
  })

  it('Nested object', () => {
    const lhs = {
      details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'elements']
      }
    }

    const rhs = {
      details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'more', 'elements', {
          than: 'before'
        }]
      }
    }

    expect(diff(lhs, rhs)).toEqual([{
        type: 'EDIT',
        path: [
          'details',
          'with',
          2
        ],
        value: 'more'
      },
      {
        type: 'ADD',
        path: [
          'details',
          'with',
          3
        ],
        value: 'elements'
      },
      {
        type: 'ADD',
        path: [
          'details',
          'with',
          4
        ],
        value: {
          than: 'before'
        }
      }
    ])
  })
})
