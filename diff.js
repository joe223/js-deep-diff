const undefined = void(0)

function diffObject(lhs, rhs, changes = [], path = []) {
  const lhsRealType = realType(lhs)
  const rhsRealType = realType(rhs)

  if (lhsRealType !== rhsRealType) {
    changes.push(new EditAction(path, rhs))
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
      changes.push(new EditAction(path, rhs))
    }
  },

  Number(lhs, rhs, changes = [], path = []) {
    if (lhs.valueOf() !== rhs.valueOf()) {
      changes.push(new EditAction(path, rhs))
    }
  },

  Boolean(lhs, rhs, changes = [], path = []) {
    if (lhs.valueOf() !== rhs.valueOf()) {
      changes.push(new EditAction(path, rhs))
    }
  },

  RegExp(lhs, rhs, changes = [], path = []) {
    if (lhs.toString() !== rhs.toString()) {
      changes.push(new EditAction(path, rhs))
    }
  },

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
        changes.push(new AddAction(p, rhs[i]))
      }
    }
  }
}

function diffPrimitive(lhs, rhs, changes = [], path = []) {
  if (lhs !== rhs) {
    changes.push(new EditAction(path, rhs))
  }
}

function diff(lhs, rhs, changes = [], path = []) {
  let lhsType = type(lhs)
  let rhsType = type(rhs)

  if (lhsType !== rhsType) {
    if (lhs === undefined) {
      changes.push(new AddAction(path, rhs))
    } else if (rhs === undefined) {
      changes.push(new DeleteAction(path, lhs))
    } else {
      changes.push(new EditAction(path, rhs))
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
  constructor(path, value) {
    this.type = 'ADD'
    this.path = path
    this.value = value
  }
}

class EditAction {
  constructor(path, value) {
    this.type = 'EDIT'
    this.path = path
    this.value = value
  }
}

class DeleteAction {
  constructor(path, value) {
    this.type = 'DEL'
    this.path = path
    this.value = value
  }
}

module.exports = diff
