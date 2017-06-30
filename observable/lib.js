import {assign} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
export function $assign__offs(obj) {
  assign__offs(obj)
  const {offs} = obj
  return {
    push,
    bind,
    change
  }
  function push() {
    offs.push(on__$off(...arguments))
    return this
  }
  function bind(obj, fn) {
    fn(obj.ctx || obj)
    return this.change(obj, fn)
  }
  function change(obj, fn) {
    offs.push(on__$off(obj, 'change', fn))
    return this
  }
}
export function bind__off(obj, fn) {
  fn(obj.ctx || obj)
  return [obj, 'change', fn]
}
export function assign__offs(ctx, ...$$args) {
  assign(ctx, {offs: $$offs__on(...$$args)})
}
export function $$offs__on(...$$args) {
  const offs = []
  for (let i=0; i < $$args.length; i++) {
    const args = $$args[i]
    offs.push(on__$off(...args))
  }
  return offs
}
export function on__$off(obj, name__event, fn) {
  obj.on(name__event, fn)
  return () => {
    obj.off(name__event, fn)
  }
}