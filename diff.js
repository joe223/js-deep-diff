function factory (config = {}) {
  const undefined = void(0)

  function diffObject(lhs, rhs, changes = [], path = []) {
    const lhsRealType = realType(lhs)
    const rhsRealType = realType(rhs)

    if (lhsRealType !== rhsRealType) {
      changes.push(new EditAction(path, lhs, rhs))
    } else if (objectDiffer[lhsRealType]) {
      objectDiffer[lhsRealType](lhs, rhs, changes, path)
    }
    //  else {
    //   diffPrimitive(lhs, rhs, changes, path)
    // }
  }

  const objectDiffer = {
    Object(lhs, rhs, changes = [], path = []) {
      const keys = new Set(Object.keys(lhs).concat(Object.keys(rhs)))
      const innerChanges = []
      let hasDeleteAction = false

      for (key of keys) {
        if (rhs[key] === undefined) {
          !hasDeleteAction && changes.push(new EditAction(path, lhs, rhs))
          hasDeleteAction = true

          if (!config.enableDeleteAction) {
            break
          }
        }
        diff(lhs[key], rhs[key], innerChanges, path.concat([key]))
      }

      if (!(hasDeleteAction && !config.enableDeleteAction)) changes.push(...innerChanges)
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
    // a is equivalent to b ?

    // Function(lhs, rhs, changes = [], path = []) {
    //   if (lhs.toString() !== rhs.toString()) {
    //     changes.push(new EditAction(path, rhs))
    //   }
    // },

    Array(lhs, rhs, changes = [], path = []) {
      const length = Math.max(lhs.length, rhs.length)
      const innerChanges = []
      let hasDeleteAction = false

      if (lhs.length > rhs.length) {
        hasDeleteAction = true
        changes.push(new EditAction(path, lhs, rhs))

        if (!config.enableDeleteAction) return
      }

      for (let i = 0; i < length; i++) {
        let p = path.concat([i])

        if (i < lhs.length) {
          diff(lhs[i], rhs[i], innerChanges, p)
        } else {
          innerChanges.push(new AddAction(p, lhs[i], rhs[i]))
        }
      }

      if (!(hasDeleteAction && !config.enableDeleteAction)) changes.push(...innerChanges)
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

  return diff
}

module.exports = factory
