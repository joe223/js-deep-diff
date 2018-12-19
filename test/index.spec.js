const diff = require('../diff')
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
      time: new Date(0),
      time2: new Date("1970-01-01T00:00:00.000Z")
    }

    var rhs = {
      time: new Date(1),
      time2: new Date("Thu, 01 Jan 1970 00:00:00 GMT")
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['time'],
      lhs: new Date(0),
      rhs: new Date(1),
      type: 'EDIT'
    }])
  })

  it('Boolean', () => {
    var lhs = {
      boolean1: new Boolean(true),
      boolean2: new Boolean(true),
      boolean3: true
    }

    var rhs = {
      boolean1: new Boolean(true),
      boolean2: new Boolean(false),
      boolean3: new Boolean(true)
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['boolean2'],
      lhs: new Boolean(true),
      rhs: new Boolean(false),
      type: 'EDIT'
    },{
      path: ['boolean3'],
      lhs: true,
      rhs: new Boolean(true),
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
  //     rhs: function fn () {
  //       return 2
  //     },
  //     type: 'EDIT'
  //   }])
  // })

  it('Number', () => {
    var lhs = {
      num1: new Number(1),
      num2: new Number(1),
      num3: 1
    }

    var rhs = {
      num1: new Number(1),
      num2: new Number(2),
      num3: new Number(1)
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['num2'],
      lhs: new Number(1),
      rhs: new Number(2),
      type: 'EDIT'
    }, {
      path: ['num3'],
      lhs: 1,
      rhs: new Number(1),
      type: 'EDIT'
    }])
  })

  it('String', () => {
    var lhs = {
      string1: new String('string'),
      string2: new String('string'),
      string3: 'string'
    }

    var rhs = {
      string1: new String('string'),
      string2: new String('string2'),
      string3: new String('string')
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['string2'],
      lhs: new String('string'),
      rhs: new String('string2'),
      type: 'EDIT'
    }, {
      path: ['string3'],
      lhs: 'string',
      rhs: new String('string'),
      type: 'EDIT'
    }])
  })

  it('RegExp', () => {
    var lhs = {
      regexp1: new RegExp('\\s'),
      regexp2: new RegExp('\\s'),
      regexp3: new RegExp('\\s')
    }

    var rhs = {
      regexp1: new RegExp('\\s'),
      regexp2: new RegExp('\\s+'),
      regexp3: /\s/
    }
    expect(diff(lhs, rhs)).toEqual([{
      path: ['regexp2'],
      lhs: new RegExp('\\s'),
      rhs: new RegExp('\\s+'),
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
        lhs: 'joe',
        rhs: 'diff',
        type: 'EDIT'
      },
      {
        path: ['age'],
        lhs: 1,
        rhs: '1',
        type: 'EDIT'
      },
      {
        path: ['checked'],
        lhs: false,
        rhs: true,
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
      lhs: undefined,
      rhs: 6,
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
      lhs: 3,
      rhs: 1,
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
      lhs: 7,
      rhs: undefined,
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
      lhs: undefined,
      rhs: 'diff',
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
      lhs: 'diff',
      rhs: undefined,
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
      lhs: [1, 2, 3, 4, 5],
      rhs: null,
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
        lhs: 'elements',
        rhs: 'more'
      },
      {
        type: 'ADD',
        path: [
          'details',
          'with',
          3
        ],
        lhs: undefined,
        rhs: 'elements'
      },
      {
        type: 'ADD',
        path: [
          'details',
          'with',
          4
        ],
        lhs: undefined,
        rhs: {
          than: 'before'
        }
      }
    ])
  })
})
