/**
 * agents for the dom
 * @module ctx-core/dom/agent
 */
import {assign,clone} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {difference__array} from 'ctx-core/array/lib'
import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/agent'
export function tabs__dom__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|tabs__dom__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'tabs__dom__agent',
    scope: ['tabs__dom', 'index__tab__dom', 'tab__dom'],
    init,
    $set$ctx,
    navigate,
    navigate__forward,
    navigate__backward
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|tabs__dom__agent|init`)
    agent = this
    window.addEventListener('keydown', on$keydown)
  }
  function $set$ctx() {
    log(`${logPrefix}|tabs__dom__agent|$set$ctx`)
    let set$ctx = clone(...arguments)
    const tabs__dom = set$ctx.tabs__dom || ctx.tabs__dom || []
        , tabs__dom__old = ctx.tabs__dom || []
        , remove$tabs = difference__array(tabs__dom__old, tabs__dom)
        , add$tabs = difference__array(tabs__dom, tabs__dom__old)
    for (let i = 0; i < remove$tabs.length; i++) {
      const remove$tab = remove$tabs[i]
      remove$tab.removeEventListener('focus', onfocus__tab)
      remove$tab.tabIndex = -1
    }
    for (let i = 0; i < add$tabs.length; i++) {
      const add$tab = add$tabs[i]
      add$tab.addEventListener('focus', onfocus__tab)
    }
    for (let i = 0; i < tabs__dom.length; i++) {
      const tab = tabs__dom[i]
      tab.tabIndex = i
    }
    const index__tab__dom =
            set$ctx.index__tab__dom != null
            ? set$ctx.index__tab__dom
            : ctx.index__tab__dom != null
              ? ctx.index__tab__dom
              : 0
        , tab__dom = tabs__dom[index__tab__dom]
    assign(set$ctx, {tab__dom, index__tab__dom})
    return set$ctx
  }
  function onfocus__tab(e) {
    log(`${logPrefix}|onfocus__tab`)
    const index__tab__dom =  ctx.tabs__dom.indexOf(e.target)
    if (index__tab__dom > -1) agent.set({index__tab__dom})
  }
  function navigate__forward() {
    log(`${logPrefix}|tabs__dom__agent|navigate__forward`)
    navigate(1)
  }
  function navigate__backward() {
    log(`${logPrefix}|tabs__dom__agent|navigate__backward`)
    navigate(-1)
  }
  function navigate(delta__or__$dom=1) {
    log(`${logPrefix}|tabs__dom__agent|navigate`, delta__or__$dom)
    const {tabs__dom = []} = ctx
        , {length = 0} = tabs__dom
    let index__tab__dom
    if (length) {
      const delta =
        typeof delta__or__$dom === "number"
        && delta__or__$dom
      if (delta) {
        index__tab__dom = index__tab__dom__from$delta(delta, length)
      } else {
        index__tab__dom = tabs__dom.indexOf(delta__or__$dom)
      }
    } else {
      index__tab__dom = 0
    }
    agent.set({index__tab__dom})
    if (ctx.tab__dom) ctx.tab__dom.focus()
  }
  function index__tab__dom__from$delta(delta, length) {
    log(`${logPrefix}|index__tab__dom__from$delta`)
    const {tabs__dom} = ctx
    let tab__dom__visible
      , index__tab__dom = ctx.index__tab__dom || 0
      , i = -1
    while (!tab__dom__visible) {
      i++
      if (i >= length) {
        warn(`${logPrefix}|index__tab__dom__from$delta|while|break`)
        break
      }
      index__tab__dom =
        (
          index__tab__dom
          + (length + (delta % length)))
        % length
      let tab__dom = tabs__dom[index__tab__dom]
        , style__tab__dom = getComputedStyle(tab__dom)
      if (style__tab__dom.display !== 'none') tab__dom__visible = tab__dom
    }
    return index__tab__dom
  }
  function on$keydown(e) {
    log(`${logPrefix}|tabs__dom__agent|on$keydown`, e)
    if(
      e.keyCode === 9
      && e.shiftKey
      && !e.altKey
      && !e.ctrlKey
      && !e.metaKey
    ) {
      e.preventDefault()
      navigate__backward()
    } else if (
      e.keyCode === 9
      && !e.getModifierState(e.key)
    ) {
      e.preventDefault()
      navigate__forward()
    }
  }
}