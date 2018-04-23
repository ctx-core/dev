import {assign} from 'ctx-core/object/lib.mjs'
import 'ctx-core/dom/polyfill.mjs'
import riot from 'riot'
import $ctx
      , {mount as _mount
      , assign__ctx} from 'ctx-core/dom/api.mjs'
import {log,error,debug} from 'ctx-core/logger/lib.mjs'
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