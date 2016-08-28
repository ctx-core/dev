/**
 * Agent methods for array data.
 * @module ctx-core/agent/array
 */
import {
  clone__array$concat,
  array$union,
  array$difference,
  array$last,
  array$compact} from 'ctx-core/array/lib'
import {
  ensure__agent,
  notify__reset__called} from 'ctx-core/agent/lib'
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
 * @param {...module:ctx-core/agent/lib~agent$ctx} agent$ctx
 * @param {string} agent$ctx.key - agent key in ctx
 * @returns {module:ctx-core/agent/lib~array__agent}
 */
export function array__agent(ctx, ...agent$ctx$$) {
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
  }, ...agent$ctx$$)
  function load() {
    log(`${logPrefix}|array__agent|load`)
    const agent = this
    agent.reset__co()
  }
  function *reset() {
    const agent = this
    log(`${logPrefix}|array__agent|reset`, agent.key)
    yield notify__reset__called(agent, function *() {
      let reset$ctx = {}
      agent.scope.forEach(
        key =>
          reset$ctx[key] = [])
      yield agent.reset__set(reset$ctx, ...arguments)
    }, ...arguments)
    return agent
  }
  function unshift(...unshift$ctx$$) {
    const unshift$ctx = clone__array$concat(...unshift$ctx$$)
    return array__union__agent.call(
      this,
      scope$ => {
        return [unshift$ctx[scope$], ctx[scope$]]
      })
  }
  function push(...push$ctx$$) {
    const push$ctx = clone__array$concat(...push$ctx$$)
    return array__union__agent.call(
      this,
      scope$ => {
        return [ctx[scope$], push$ctx[scope$]]
      })
  }
  function array__union__agent(union__fn) {
    const agent = this
        , set$ctx = agent.scope.reduce(
            (memo, scope$) => {
              memo[scope$] = array$union(...array$compact(union__fn(scope$)))
              return memo
            }, {})
    log(`${logPrefix}|array__agent|array__union__agent`, set$ctx)
    agent.set(set$ctx)
    return agent
  }
  function pop(...pop$key$$) {
    log(`${logPrefix}|array__agent|pop`)
    const agent = this
    if (!pop$key$$.length) pop$key$$ = [agent.scope$()]
    return agent.remove(
      pop$key$$.map(
        key => {
          let remove$ctx = {}
          remove$ctx[key] = [array$last(ctx[key])]
          return remove$ctx
        }))
  }
  function remove(...remove$ctx$$) {
    log(`${logPrefix}|array__agent|remove`)
    const agent = this
        , remove$ctx = clone__array$concat(...remove$ctx$$)
        , set$ctx = agent.scope.reduce(
            (memo, scope$) => {
              const remove$value = remove$ctx[scope$]
              if (remove$value) {
                const $ = memo[scope$] || []
                memo[scope$] = array$difference($, remove$value)
              }
              return memo
            }, agent.pick())
    agent.set(set$ctx)
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