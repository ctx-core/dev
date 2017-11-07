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
export function $mixins__search__collection__agent(ctx, opts={}) {
  log(`${logPrefix}|$mixins__search__collection__agent`)
  const { agent
        , key__search
        , key__query
        , key__data
        , $data
        } = opts
  return {
    reset
  }
  async function reset() {
    log(`${logPrefix}|$mixins__search__collection__agent|reset`)
    const query = ctx[key__query]
    if (!query) {
      agent.clear()
      return
    }
    const search__previous = ctx[key__search]
        , query__previous =
            search__previous
            && search__previous.query
    if (query__previous == query) {
      return
    }
    const __set__loading = {}
    __set__loading[key__search] = {
      _loading: true,
      query
    }
    agent.set(__set__loading)
    const data = await $data(ctx, {query})
    if (query === ctx[key__query]) {
      const __set__done = {}
      __set__done[key__search] = {
        _done: true,
        query,
        data
      }
      __set__done[key__search][key__data] = data
      __set__done[key__data] = data
      agent.set(__set__done)
      return
    }
  }
}
export function $mixins__search__item__agent(ctx, opts={}) {
  log(`${logPrefix}|$mixins__search__item__agent`)
  const { agent
        , key__search
        , key__index
        , key__item
        } = opts
  return {
    reset,
    enter,
    up,
    down,
    on$change__search
  }
  async function reset() {
    log(`${logPrefix}|$mixins__search__item__agent|reset`)
    const ctx__reset = clone(...arguments)
        , index = ctx__reset[key__index] || 0
        , search = ctx[key__search]
        , data = (search && search.data) || []
        , $ = {}
    let item = ctx__reset[key__item]
    if (!item) {
      item = data[index]
    }
    $[key__item] = item
    $[key__index] = index
    return agent.reset__set($)
  }
  function enter() {
    log(`${logPrefix}|$mixins__search__item__agent|enter`)
    agent.trigger('enter', agent.get())
  }
  function up() {
    log(`${logPrefix}|$mixins__search__item__agent|up`)
    const search = ctx[key__search]
        , data = (search && search.data) || []
        , index = prev__index(data.length, ctx[key__index])
        , item = data[index]
        , $ = {}
    $[key__index] = index
    $[key__item] = item
    return agent.set($)
  }
  function down() {
    log(`${logPrefix}|$mixins__search__item__agent|down`)
    const search = ctx[key__search]
        , data = (search && search.data) || []
        , index = next__index(data.length, ctx[key__index])
        , item = data[index]
        , $ = {}
    $[key__index] = index
    $[key__item] = item
    return agent.set($)
  }
  function on$change__search() {
    log(`${logPrefix}|$mixins__search__item__agent|on$change__search`)
    const search = ctx[key__search]
        , data = (search && search.data) || []
        , index = 0
        , $ = {}
    $[key__item] = data[index]
    $[key__index] = index
    agent.reset($)
  }
}