import {keys} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
export function $assign__offs(obj, key='_') {
  if (!obj.offs) obj.offs = {}
  const {offs} = obj
  if (!offs[key]) offs[key] = []
  return {
    push,
    bind,
    change
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
}
export function offs__call(obj, ..._keys) {
  if (!obj.offs) obj.offs = {}
  const {offs} = obj
  if (!_keys.length) {
    _keys = keys(offs)
  }
  for (let i=0; i < _keys.length; i++) {
    const key = _keys[i]
        , _offs = offs[key]
    for (let i=0; i < _offs.length; i++) {
      const off = _offs[i]
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