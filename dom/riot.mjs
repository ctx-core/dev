import {assign} from 'ctx-core/object/lib'
import 'ctx-core/dom/polyfill'
import riot from 'riot'
import $ctx
      , {mount as _mount
      , assign__ctx} from 'ctx-core/dom/api'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/riot.mjs'
assign($ctx, riot, {
  mount
})
export default $ctx
export function mount() {
  log(`${logPrefix}|mount`)
  const ctx__mount = _mount(...arguments)
      , {ctx, mount} = ctx__mount
  for (let i=0; i < mount.length; i++) {
    const mount$ = mount[i]
    riot.mount(mount$, {ctx})
  }
  return ctx
}
export {assign__ctx}