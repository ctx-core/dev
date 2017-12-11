import {keys} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
export function $assign__offs(obj, key='_') {
  if (!obj.offs) obj.offs = {}
  const {offs} = obj
  if (!offs[key]) offs[key] = []
  return {
    push,
    bind,
    change,
    set
  }
  function push() {
    offs[key].push(on__$off(...arguments))
    return this
  }
  function bind(obj, fn) {
    fn(obj.ctx || obj)
    return this.change(obj, fn)
  }
  function change(obj, fn) {
    offs[key].push(on__$off(obj, 'change', fn))
    return this
  }
  function set(obj, fn) {
    offs[key].push(on__$off(obj, 'set', fn))
    return this
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