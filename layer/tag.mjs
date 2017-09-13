import {clone} from 'ctx-core/object/lib'
import {layers__agent} from 'ctx-core/layer/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/layer/tag'
export function mount__layers(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__layers`)
  const ctx__mount = clone(...ctx__mount$$)
      , {dom$el=document.body} = ctx__mount
  let {ctx} = tag
  layers__agent(ctx)
  ctx.layers__agent.unshift({
      layers: [{
        zIndex: 0,
        dom$el
      }]
    })
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|mount__layers|on$mount`)
    ctx.layers__agent.pick__on(ctx__mount)
  }
  function on$unmount() {
    log(`${logPrefix}|mount__layers|on$unmount`)
    ctx.layers__agent.pick__off(ctx__mount)
  }
}