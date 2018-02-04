import {assign,keys} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
export function $assign__offs(obj, key='_') {
  if (!obj.offs) obj.offs = {}
  const {offs} = obj
  if (!offs[key]) offs[key] = []
  return {
    push,
    bind,
    change,
    set,
    observe
  }
  function push() {
    offs[key].push(on__$off(...arguments))
    return this
  }
  function bind(observable, fn) {
    fn(observable.ctx || observable)
    return this.change(observable, fn)
  }
  function change(observable, fn) {
    offs[key].push(on__$off(observable, 'change', fn))
    return this
  }
  function set(observable, fn) {
    offs[key].push(on__$off(observable, 'set', fn))
    return this
  }
  function observe(observable, fn) {
    const assign__offs =
            assign(
              $assign__offs(obj),
              { push: push__,
                bind: bind__,
                change: change__,
                set: set__})
    fn(assign__offs)
    return this
    function push__() {
      offs[key].push(on__$off(observable, ...arguments))
      return this
    }
    function bind__(fn) {
      bind(observable, fn)
      return this
    }
    function change__(fn) {
      change(observable, fn)
      return this
    }
    function set__(fn) {
      set(observable, fn)
      return this
    }
  }
}
export function offs__call(obj, ...array__key) {
  if (!obj.offs) obj.offs = {}
  const {offs} = obj
  if (!array__key.length) {
    array__key = keys(offs)
  }
  for (let i=0; i < array__key.length; i++) {
    const key = array__key[i]
        , offs__ = offs[key]
    for (let i=0; i < offs__.length; i++) {
      const off = offs__[i]
      off()
    }
    delete offs[key]
  }
  return offs
}
export function on__$off(obj, name__event, fn) {
  obj.on(name__event, fn)
  return () => {
    obj.off(name__event, fn)
  }
}