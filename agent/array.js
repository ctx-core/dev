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
const logPrefix = 'ctx-core/agent/array'
/**
 * An agent acting on an array in the ctx.
 * @typedef {module:ctx-core/agent/lib~agent} array__agent
 * @property {function} push - Push the scoped ctx array values to the ctx.
 * @example
 * array__agent.push({array_key: {foo: 'bar'}})
 * @property {function} push__array__agent - Default function for array__agent.push. Can be used by subtypes.
 * @property {function} remove - Removes the scoped ctx array values from the ctx.
 * array__agent.remove({array_key: {foo: 'bar'}})
 * @property {function} remove__array__agent - Default function for array__agent.remove. Can be used by subtypes.
 * @property {function} clear - Sets the agent scope to an empty array on the ctx.
 * @property {function} clear__array__agent - Default function for array__agent.clear. Can be used by subtypes.
 */
/**
 * Ensures an agent that acts on an array value.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @param {string} ctx__agent.key - agent key in ctx
 * @returns {module:ctx-core/agent/lib~array__agent}
 */
export function array__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|array__agent`)
  return ensure__agent(ctx, {
    load,
    load__array: load,
    reset,
    push,
    push__array__agent: push,
    pop,
    pop__array__agent: pop,
    unshift,
    unshift__array__agent: unshift,
    remove,
    remove__array__agent: remove,
    clear,
    clear__array__agent: clear
  }, ...ctx__agent$$)
  function load() {
    log(`${logPrefix}|array__agent|load`)
    const agent = this
    agent.reset()
  }
  async function reset() {
    const agent = this
    log(`${logPrefix}|array__agent|reset`, agent.key)
    try {
      let ctx__reset = {}
      const {scope} = agent
      for (let i=0; i < scope.length; i++) {
        const key = scope[i]
        ctx__reset[key] = []
      }
      await agent.reset__set(ctx__reset, ...arguments)
    } catch (ctx__error) {
      agent.trigger('reset__error', ctx__error)
      throw ctx__error
    }
    agent.trigger('reset__success')
    return agent
  }
  function unshift(...unshift$ctx$$) {
    const unshift$ctx = clone__concat__array(...unshift$ctx$$)
    return array__union__agent.call(
      this,
      scope$ => {
        return [unshift$ctx[scope$], ctx[scope$]]
      })
  }
  function push(...push$ctx$$) {
    const push$ctx = clone__concat__array(...push$ctx$$)
    return array__union__agent.call(
      this,
      scope$ => {
        return [ctx[scope$], push$ctx[scope$]]
      })
  }
  function array__union__agent(union__fn) {
    const agent = this
        , ctx__set = agent.scope.reduce(
            (memo, scope$) => {
              memo[scope$] = union__array(...compact__array(union__fn(scope$)))
              return memo
            }, {})
    log(`${logPrefix}|array__agent|array__union__agent`, ctx__set)
    agent.set(ctx__set)
    return agent
  }
  function pop(...pop$key$$) {
    log(`${logPrefix}|array__agent|pop`)
    const agent = this
    if (!pop$key$$.length) pop$key$$ = [agent.scope$]
    return agent.remove(
      pop$key$$.map(
        key => {
          let remove$ctx = {}
          remove$ctx[key] = [last__array(ctx[key])]
          return remove$ctx
        }))
  }
  function remove(...remove$ctx$$) {
    log(`${logPrefix}|array__agent|remove`)
    const agent = this
        , remove$ctx = clone__concat__array(...remove$ctx$$)
        , ctx__set = agent.scope.reduce(
            (memo, scope$) => {
              const remove$value = remove$ctx[scope$]
              if (remove$value) {
                const $ = memo[scope$] || []
                memo[scope$] = difference__array($, remove$value)
              }
              return memo
            }, agent.pick())
    agent.set(ctx__set)
    return agent
  }
  function clear(...scope) {
    log(`${logPrefix}|array__agent|clear`)
    const agent = this
    if (!scope.length) scope = agent.scope
      scope.reduce((memo, scope$) => {
        memo[scope$] = ctx[scope$] || []
        return memo
      }, {})
    agent.remove(scope.reduce((memo, scope$) => {
      memo[scope$] = ctx[scope$] || []
      return memo
    }, {}))
    return agent
  }
}