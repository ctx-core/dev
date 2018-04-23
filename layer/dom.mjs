import {clone} from 'ctx-core/object/lib.mjs'
import {agent__layers} from 'ctx-core/layer/agent.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/layer/dom.mjs'
export function mount__layers(tag, ...array__ctx__mount) {
  log(`${logPrefix}|mount__layers`)
  const ctx__mount = clone(...array__ctx__mount)
      , {el=document.body} = ctx__mount
  let {ctx} = tag
  agent__layers(ctx).unshift({
      layers: [{
        zIndex: 0,
        el
      }]
    })
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  return tag
  function onmount() {
    log(`${logPrefix}|mount__layers|onmount`)
    agent__layers(ctx).pick__on(ctx__mount)
  }
  function onunmount() {
    log(`${logPrefix}|mount__layers|onunmount`)
    agent__layers(ctx).pick__off(ctx__mount)
  }
}