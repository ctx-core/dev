import {clone} from 'ctx-core/object/lib'
import {agent__layers} from 'ctx-core/layer/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/layer/dom.mjs'
export function mount__layers(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__layers`)
  const ctx__mount = clone(...ctx__mount$$)
      , {dom$el=document.body} = ctx__mount
  let {ctx} = tag
  agent__layers(ctx)
  ctx.agent__layers.unshift({
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
    ctx.agent__layers.pick__on(ctx__mount)
  }
  function on$unmount() {
    log(`${logPrefix}|mount__layers|on$unmount`)
    ctx.agent__layers.pick__off(ctx__mount)
  }
}