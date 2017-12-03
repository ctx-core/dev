import {assign} from 'ctx-core/object/lib'
import $ctx
      , {mount as mount__
      , assign__ctx} from 'ctx-core/dom/api'
import {bind__store__agent__agents} from 'ctx-core/agent/svelte'
import {Store} from 'svelte/store'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/svelte'
assign($ctx, {
  mount
})
export default $ctx
export function mount() {
  log(`${logPrefix}|mount`)
  const ctx__mount = mount__(...arguments)
      , {ctx, components: components__} = ctx__mount
      , store = new Store(ctx)
  window.store = store
  ctx.store = store
  bind__store__agent__agents(ctx, store)
  for (let i=0; i < components__.length; i++) {
    const component__ = components__[i]
    let opts__component = {}
      , name__component
    if (typeof component__ === 'string') {
      name__component = component__
    } else {
      name__component =
        component__[0]
        || component__.name__component
      opts__component =
        component__[1]
        || component__.opts__component
    }
    try {
      new components[name__component](
        assign({
          target: document.body,
          store,
          data: {ctx}
        }, opts__component))
    } catch (e) {
      error(`${logPrefix}|mount|error`, {
        e,
        name__component,
        opts__component
      })
      throw e
    }
  }
  return ctx
}
export {assign__ctx}
export const components = {}
export function assign__components() {
  assign(components, ...arguments)
}