import {clone} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/scroll/agent.mjs'
export function agent__active__Sticky__Scroll(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__active__Sticky__Scroll',
    scope: ['active__Sticky__Scroll'],
    init,
    reset,
    add,
    remove,
    $active,
    $match
  })
  function init() {
    log(`${logPrefix}|agent__active__Sticky__Scroll|init`)
    agent = this
    reset()
  }
  async function reset() {
    agent.set({active__Sticky__Scroll: {}})
  }
  function add(key) {
    log(`${logPrefix}|add`)
    const active__Sticky__Scroll = clone(ctx.active__Sticky__Scroll)
    active__Sticky__Scroll[key] = true
    agent.set({active__Sticky__Scroll})
  }
  function remove(key) {
    log(`${logPrefix}|remove`)
    const active__Sticky__Scroll = clone(ctx.active__Sticky__Scroll)
    active__Sticky__Scroll[key] = false
    agent.set({active__Sticky__Scroll})
  }
  function $active(key) {
    log(`${logPrefix}|$active`)
    const {active__Sticky__Scroll} = ctx
        , active =
            active__Sticky__Scroll
            ? active__Sticky__Scroll[key]
            : false
    return active
  }
  function $match(key, active) {
    return !!(active) == !!($active(key))
  }
}