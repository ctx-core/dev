/**
 * Agent methods for array data.
 * @module ctx-core/agent/array
 */
import {
  clone__concat__array,
  union__array,
  difference__array,
  last__array,
  compact__array} from 'ctx-core/array/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/array.mjs'
/**
 * An agent acting on an array in the ctx.
 * @typedef {module:ctx-core/agent/lib~agent} ensure__agent__array
 * @property {function} push - Push the scoped ctx array values to the ctx.
 * @example
 * ensure__agent__array.push({array_key: {foo: 'bar'}})
 * @property {function} push__agent__array - Default function for ensure__agent__array.push. Can be used by subtypes.
 * @property {function} remove - Removes the scoped ctx array values from the ctx.
 * ensure__agent__array.remove({array_key: {foo: 'bar'}})
 * @property {function} remove__agent__array - Default function for ensure__agent__array.remove. Can be used by subtypes.
 * @property {function} clear - Sets the agent scope to an empty array on the ctx.
 * @property {function} clear__agent__array - Default function for ensure__agent__array.clear. Can be used by subtypes.
 */
/**
 * Ensures an agent that acts on an array value.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @param {string} ctx__agent.key - agent key in ctx
 * @returns {module:ctx-core/agent/lib~agent__array}
 */
export function ensure__agent__array(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|ensure__agent__array`)
  return ensure__agent(ctx, {
    load,
    load__array: load,
    reset,
    push,
    push__agent__array: push,
    pop,
    pop__agent__array: pop,
    unshift,
    unshift__agent__array: unshift,
    remove,
    remove__agent__array: remove,
    clear,
    clear__agent__array: clear
  }, ...array__ctx__agent)
  function load() {
    log(`${logPrefix}|ensure__agent__array|load`)
    const agent = this
    agent.reset()
  }
  async function reset() {
    const agent = this
    log(`${logPrefix}|ensure__agent__array|reset`, agent.key)
    let ctx__reset = {}
    const {scope} = agent
    for (let i=0; i < scope.length; i++) {
      const scope__ = scope[i]
      ctx__reset[scope__] = []
    }
    agent.set(ctx__reset, ...arguments)
    return agent
  }
  function unshift(...array__ctx__unshift) {
    const ctx__unshift =
            clone__concat__array(
              ...array__ctx__unshift)
    return union__agent__array.call(
      this,
      scope__ => [
        ctx__unshift[scope__],
        ctx[scope__]])
  }
  function push(...push$ctx$$) {
    const ctx__push =
            clone__concat__array(...push$ctx$$)
    return union__agent__array.call(
      this,
      scope__ =>
        [ctx[scope__],
        ctx__push[scope__]])
  }
  function union__agent__array(union__fn) {
    const agent = this
        , ctx__set = $ctx__set()
    log(`${logPrefix}|ensure__agent__array|union__agent__array`, ctx__set)
    agent.set(ctx__set)
    return agent
    function $ctx__set() {
      const {scope} = agent
          , ctx__set = {}
      for (let i=0; i < scope.length; i++) {
        const scope__ = scope[i]
        ctx__set[scope__] =
          union__array(
            ...compact__array(union__fn(scope__)))
      }
      return ctx__set
    }
  }
  function pop(...keys__pop) {
    log(`${logPrefix}|ensure__agent__array|pop`)
    const agent = this
    if (!keys__pop.length) keys__pop = [agent.scope$]
    return agent.remove($ctx__remove())
    function $ctx__remove() {
      const ctx__remove = {}
      for (let i=0; i < keys__pop.length; i++) {
        const key = keys__pop[i]
        ctx__remove[key] = [last__array(ctx[key])]
      }
      return ctx__remove
    }
  }
  function remove(...__ctx__remove) {
    log(`${logPrefix}|ensure__agent__array|remove`)
    const agent = this
        , ctx__remove =
            clone__concat__array(...__ctx__remove)
        , ctx__set = $ctx__set()
    agent.set(ctx__set)
    return agent
    function $ctx__set() {
      const {scope} = agent
          , ctx__set = agent.pick()
      for (let i=0; i < scope.length; i++) {
        const scope__ = scope[i]
            , value = ctx__remove[scope__]
        if (value) {
          const $ = ctx__set[scope__] || []
          ctx__set[scope__] =
            difference__array($, value)
        }
      }
      return ctx__set
    }
  }
  function clear(...scope) {
    log(`${logPrefix}|ensure__agent__array|clear`)
    const agent = this
    if (!scope.length) scope = agent.scope
    agent.remove($ctx__remove())
    return agent
    function $ctx__remove() {
      const ctx__remove = {}
      for (let i=0; i < scope.length; i++) {
        const scope__ = scope[i]
        ctx__remove[scope__] = ctx[scope__] || []
      }
      return ctx__remove
    }
  }
}