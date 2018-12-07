const undefined = void(0)

function diffObject(lhs, rhs, changes = [], path = []) {
  const lhsRealType = realType(lhs)
  const rhsRealType = realType(rhs)

  if (lhsRealType !== rhsRealType) {
    changes.push(new EditAction(path, lhs, rhs))
  } else if (differ[lhsRealType]) {
    differ[lhsRealType](lhs, rhs, changes, path)
  }
  //  else {
  //   diffPrimitive(lhs, rhs, changes, path)
  // }
}

const differ = {
  Object(lhs, rhs, changes = [], path = []) {
    const keys = new Set(Object.keys(lhs)).add(...Object.keys(rhs))

    keys.forEach(key => {
      diff(lhs[key], rhs[key], changes, path.concat([key]))
    })
  },

  Date(lhs, rhs, changes = [], path = []) {
    if (lhs.getTime() !== rhs.getTime()) {
      changes.push(new EditAction(path, lhs, rhs))
    }
  },

  Number(lhs, rhs, changes = [], path = []) {
    if (lhs.valueOf() !== rhs.valueOf()) {
      changes.push(new EditAction(path, lhs, rhs))
    }
  },

  String(lhs, rhs, changes = [], path = []) {
    if (lhs.valueOf() !== rhs.valueOf()) {
      changes.push(new EditAction(path, lhs, rhs))
    }
  },

  Boolean(lhs, rhs, changes = [], path = []) {
    if (lhs.valueOf() !== rhs.valueOf()) {
      changes.push(new EditAction(path, lhs, rhs))
    }
  },

  RegExp(lhs, rhs, changes = [], path = []) {
    if (lhs.toString() !== rhs.toString()) {
      changes.push(new EditAction(path, lhs, rhs))
    }
  },

  // One problem:
  // const a = () => 1
  // const b = () => { return 1 }
  // a is equal to b ?

  // Function(lhs, rhs, changes = [], path = []) {
  //   if (lhs.toString() !== rhs.toString()) {
  //     changes.push(new EditAction(path, rhs))
  //   }
  // },

  Array(lhs, rhs, changes = [], path = []) {
    const length = Math.max(lhs.length, rhs.length)

    for (let i = 0; i < length; i++) {
      let p = path.concat([i])

      if (i < lhs.length) {
        diff(lhs[i], rhs[i], changes, p)
      } else {
        changes.push(new AddAction(p, lhs[i], rhs[i]))
      }
    }
  }
}

function diffPrimitive(lhs, rhs, changes = [], path = []) {
  if (lhs !== rhs) {
    changes.push(new EditAction(path, lhs, rhs))
  }
}

function diff(lhs, rhs, changes = [], path = []) {
  const lhsType = type(lhs)
  const rhsType = type(rhs)

  if (lhsType !== rhsType) {
    if (lhs === undefined) {
      changes.push(new AddAction(path, lhs, rhs))
    } else if (rhs === undefined) {
      changes.push(new DeleteAction(path, lhs, rhs))
    } else {
      changes.push(new EditAction(path, lhs, rhs))
    }

    // Object type
  } else if (lhsType === 'object') {
    diffObject(lhs, rhs, changes, path)
    // Primitive type
  } else {
    diffPrimitive(lhs, rhs, changes, path)
  }
  return changes
}

function type(val) {
  return typeof val
}

function realType(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

class AddAction {
  constructor(path, lhs, rhs) {
    this.type = 'ADD'
    this.path = path
    this.lhs = lhs
    this.rhs = rhs
  }
}

class EditAction {
  constructor(path, lhs, rhs) {
    this.type = 'EDIT'
    this.path = path
    this.lhs = lhs
    this.rhs = rhs
  }
}

class DeleteAction {
  constructor(path, lhs, rhs) {
    this.type = 'DEL'
    this.path = path
    this.lhs = lhs
    this.rhs = rhs
  }
}

module.exports = diff
