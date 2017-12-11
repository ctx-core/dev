/**
 * agents for html layout
 * @module ctx-core/search/agent
 */
import {ensure__agent} from 'ctx-core/agent/lib'
import {clone} from 'ctx-core/object/lib'
import {prev__index, next__index} from 'ctx-core/array/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/search/agent'
export function agent__opened__search(
  ctx,
  ...array__ctx__agent
) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__opened__search',
    scope: ['opened__search'],
    init,
    toggle
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function toggle() {
    log(`${logPrefix}|agent__opened__search|toggle`)
    const {scope$} = agent
        , ctx__set = {}
    ctx__set[scope$] = !ctx[scope$]
    agent.set(ctx__set)
  }
}
export function agent__focused__search(ctx, ...array__ctx__agent) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__focused__search',
    scope: ['focused__search'],
    init,
    toggle
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function toggle() {
    log(`${logPrefix}|agent__focused__search|toggle`)
    const {scope$} = agent
        , ctx__set = {}
    ctx__set[scope$] = !ctx[scope$]
    agent.set(ctx__set)
  }
}
export function $mixins__agent__search__collection(ctx, opts={}) {
  log(`${logPrefix}|$mixins__agent__search__collection`)
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
    log(`${logPrefix}|$mixins__agent__search__collection|reset`)
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
export function $mixins__agent__search__item(ctx, opts={}) {
  log(`${logPrefix}|$mixins__agent__search__item`)
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
    onchange__search
  }
  async function reset() {
    log(`${logPrefix}|$mixins__agent__search__item|reset`)
    const ctx__reset = clone(...arguments)
        , index = ctx__reset[key__index] || 0
        , search = ctx[key__search]
        , data = (search && search.data) || []
        , ctx__set = {}
    let item = ctx__reset[key__item]
    if (!item) {
      item = data[index]
    }
    ctx__set[key__item] = item
    ctx__set[key__index] = index
    return agent.set(ctx__set)
  }
  function enter() {
    log(`${logPrefix}|$mixins__agent__search__item|enter`)
    agent.trigger('enter', agent.get())
  }
  function up() {
    log(`${logPrefix}|$mixins__agent__search__item|up`)
    const search = ctx[key__search]
        , data = (search && search.data) || []
        , index = prev__index(data.length, ctx[key__index])
        , item = data[index]
        , ctx__set = {}
    ctx__set[key__index] = index
    ctx__set[key__item] = item
    return agent.set(ctx__set)
  }
  function down() {
    log(`${logPrefix}|$mixins__agent__search__item|down`)
    const search = ctx[key__search]
        , data = (search && search.data) || []
        , index = next__index(data.length, ctx[key__index])
        , item = data[index]
        , ctx__set = {}
    ctx__set[key__index] = index
    ctx__set[key__item] = item
    return agent.set(ctx__set)
  }
  function onchange__search() {
    log(`${logPrefix}|$mixins__agent__search__item|onchange__search`)
    const search = ctx[key__search]
        , data = (search && search.data) || []
        , index = 0
        , ctx__set = {}
    ctx__set[key__item] = data[index]
    ctx__set[key__index] = index
    agent.reset(ctx__set)
  }
}