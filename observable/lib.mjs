import {assign,keys} from 'ctx-core/object/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
export function $assign__offs(obj, key='_') {
  if (!obj.offs) obj.offs = {}
  const {offs} = obj
  if (!offs[key]) offs[key] = []
  return {
    push,
    on,
    bind,
    change,
    set,
    subject
  }
  function push() {
    offs[key].push(...arguments)
    return this
  }
  function on() {
    offs[key].push(call__on__return__$off(...arguments))
    return this
  }
  function bind(observable, fn) {
    fn(observable.ctx || observable)
    return this.change(observable, fn)
  }
  function change(observable, fn) {
    offs[key].push(call__on__return__$off(observable, 'change', fn))
    return this
  }
  function set(observable, fn) {
    offs[key].push(call__on__return__$off(observable, 'set', fn))
    return this
  }
  function subject(observable, fn) {
    const assign__offs =
            assign(
              $assign__offs(obj),
              { on: on__,
                bind: bind__,
                change: change__,
                set: set__})
    fn(assign__offs)
    return this
    function on__() {
      offs[key].push(call__on__return__$off(observable, ...arguments))
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
export function call__offs(obj, ...array__key) {
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
export function call__on__return__$off(obj, name__event, fn) {
  const observation = obj.on(name__event, fn)
  return () => {
    if (observation && observation.cancel) return observation.cancel()
    if (obj.off) return obj.off(name__event, fn)
  }
}