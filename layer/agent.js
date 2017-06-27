/**
 * Agent methods for layers.
 * @module ctx-core/layer/agent
 */
import {clone} from 'ctx-core/object/lib'
import {
  clone__concat__array,
  last__array} from 'ctx-core/array/lib'
import {array__agent} from 'ctx-core/agent/array'
import {throw__invalid_state} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const {isNaN} = Number
    , logPrefix = 'ctx-core/layer/agent'
export function layers__agent(ctx, ...ctx__agent$$) {
  const ctx__agent = clone(...ctx__agent$$)
  let agent
  return array__agent(ctx, {
    key: 'layers__agent',
    scope: ['layers'],
    zIndex__base: ctx__agent.zIndex__base || 0,
    init,
    load,
    push,
    top,
    zIndex__top,
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function load() {
    log(`${logPrefix}|layers__agent|load`)
    if (agent.scope.every(scope$ => ctx[scope$])) return
    log(`${logPrefix}|layers__agent|load|load__array`)
    agent.load__array(...arguments)
  }
  function push(...$$layers) {
    log(`${logPrefix}|layers__agent|push`)
    const $layers = clone__concat__array(...$$layers)
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
    agent.push__array__agent($layers)
    return agent
  }
  function top(key) {
    log(`${logPrefix}|layers__agent|top`)
    key = key || agent.scope$
    const layers = ctx[key]
    return last__array(layers)
  }
  function zIndex__top() {
    log(`${logPrefix}|layers__agent|zIndex__top`)
    const top = agent.top(...arguments)
    return top && top.zIndex
  }
}