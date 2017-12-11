/**
 * Agent methods for layers.
 * @module ctx-core/layer/agent
 */
import {clone} from 'ctx-core/object/lib'
import {
  clone__concat__array,
  last__array} from 'ctx-core/array/lib'
import {ensure__agent__array} from 'ctx-core/agent/array'
import {throw__invalid_state} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const {isNaN} = Number
    , logPrefix = 'ctx-core/layer/agent'
export function agent__layers(ctx, ...array__opts) {
  const opts = clone(...array__opts)
  let agent
  return ensure__agent__array(ctx, {
    key: 'agent__layers',
    scope: ['layers'],
    zIndex__base: opts.zIndex__base || 0,
    init,
    load,
    push,
    top,
    zIndex__top,
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function load() {
    log(`${logPrefix}|agent__layers|load`)
    if (agent.scope.every(scope__ => ctx[scope__])) return
    log(`${logPrefix}|agent__layers|load|load__array`)
    agent.load__array(...arguments)
  }
  function push(...array__layers) {
    log(`${logPrefix}|agent__layers|push`)
    const $layers = clone__concat__array(...array__layers)
    const {scope} = agent
    for (let i=0; i < scope.length; i++) {
      const scope$ = scope[i]
          , layers = $layers[scope$] || []
      for (let j=0; j < layers.length; j++) {
        const layer = layers[j]
            , {zIndex} = layer
            , zIndex__top = agent.zIndex__top()
        if (Number.isFinite(zIndex)) {
          if (zIndex__top != null && zIndex <= zIndex__top) {
            throw__invalid_state(ctx, {
              key: scope$,
              reason: `zIndex must be greater than ctx.${agent.key}.zIndex__top('${scope$}')`
            })
          }
        } else {
          layer.zIndex =
            isNaN(zIndex__top)
            ? agent.zIndex__base
            : zIndex__top + 1
        }
      }
    }
    agent.push__agent__array($layers)
    return agent
  }
  function top(key) {
    log(`${logPrefix}|agent__layers|top`)
    key = key || agent.scope$
    const layers = ctx[key]
    return last__array(layers)
  }
  function zIndex__top() {
    log(`${logPrefix}|agent__layers|zIndex__top`)
    const top = agent.top(...arguments)
    return top && top.zIndex
  }
}