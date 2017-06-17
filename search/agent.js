/**
 * agents for html layout
 * @module ctx-core/search/agent
 */
import {ensure__agent} from 'ctx-core/agent/lib'
import {clone} from 'ctx-core/object/lib'
import {prev__index, next__index} from 'ctx-core/array/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/search/agent'
export function opened__search__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|opened__search__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'opened__search__agent',
    scope: ['opened__search'],
    init,
    toggle
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function toggle() {
    log(`${logPrefix}|opened__search__agent|toggle`)
    const {scope$} = agent
        , $ = {}
    $[scope$] = !ctx[scope$]
    agent.set($)
  }
}
export function focused__search__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|focused__search__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'focused__search__agent',
    scope: ['focused__search'],
    init,
    toggle
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function toggle() {
    log(`${logPrefix}|focused__search__agent|toggle`)
    const {scope$} = agent
        , $ = {}
    $[scope$] = !ctx[scope$]
    agent.set($)
  }
}
export function $search__collection__agent__mixins(ctx, opts={}) {
  log(`${logPrefix}|$search__collection__agent__mixins`)
  const { agent
        , key__collection
        , key__query
        , fetch__search__collection} = opts
  return {
    reset
  }
  async function reset() {
    log(`${logPrefix}|$search__collection__agent__mixins|reset`)
    const query = ctx[key__query]
    if (!query) {
      return agent.reset__clear()
    }
    const collection = ctx[key__collection]
        , query__previous =
            collection
            && collection.query
    if (query__previous == query) {
      return agent.reset__noop()
    }
    const $ = await fetch__search__collection(ctx, {query})
    if (query === ctx[key__query]) {
      const _reset__set = {}
      _reset__set[key__collection] = $
      return agent.reset__set(_reset__set)
    }
    return agent.reset__noop()
  }
}
export function $search__item__agent__mixins(ctx, opts={}) {
  log(`${logPrefix}|$search__item__agent__mixins`)
  const { agent
        , key__collection
        , key__index
        , key__item} = opts
  return {
    reset,
    enter,
    up,
    down,
    on$change__collection
  }
  async function reset() {
    log(`${logPrefix}|$search__item__agent__mixins|reset`)
    const ctx__reset = clone(...arguments)
        , index = ctx__reset[key__index] || 0
        , collection = ctx[key__collection] || []
        , $ = {}
    let item = ctx__reset[key__item]
    if (!item) {
      item = collection[index]
    }
    $[key__item] = item
    $[key__index] = index
    return agent.reset__set($)
  }
  function enter() {
    log(`${logPrefix}|$search__item__agent__mixins|enter`)
    agent.trigger('enter', agent.get())
  }
  function up() {
    log(`${logPrefix}|$search__item__agent__mixins|up`)
    const collection = ctx[key__collection] || []
        , index = prev__index(collection.length, ctx[key__index])
        , item = collection[index]
        , $ = {}
    $[key__index] = index
    $[key__item] = item
    return agent.set($)
  }
  function down() {
    log(`${logPrefix}|$search__item__agent__mixins|down`)
    const collection = ctx[key__collection] || []
        , index = next__index(collection.length, ctx[key__index])
        , item = collection[index]
        , $ = {}
    $[key__index] = index
    $[key__item] = item
    return agent.set($)
  }
  function on$change__collection() {
    log(`${logPrefix}|$search__item__agent__mixins|on$change__collection`)
    const collection = ctx[key__collection] || []
        , index = 0
        , $ = {}
    $[key__item] = collection[index]
    $[key__index] = index
    agent.reset($)
  }
}