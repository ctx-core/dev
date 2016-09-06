/**
 * agents for the dom
 * @module ctx-core/dom/agent
 */
import {assign,clone} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {difference__array} from 'ctx-core/array/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/agent'
export function tabs__dom__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|tabs__dom__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'tabs__dom__agent',
    scope: ['tabs__dom', 'index__tab__dom', 'tab__dom'],
    init,
    new__set$ctx,
    navigate,
    navigate__forward,
    navigate__backward
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|tabs__dom__agent|init`)
    agent = this
    window.addEventListener('keydown', on$keydown)
  }
  function new__set$ctx() {
    log(`${logPrefix}|tabs__dom__agent|new__set$ctx`)
    let set$ctx = clone(...arguments)
    const tabs__dom = set$ctx.tabs__dom || ctx.tabs__dom || []
        , tabs__dom__old = ctx.tabs__dom || []
        , remove$tabs = difference__array(tabs__dom__old, tabs__dom)
        , add$tabs = difference__array(tabs__dom, tabs__dom__old)
    remove$tabs.forEach(
      remove$tab => {
        remove$tab.removeEventListener('focus', onfocus__tab)
        remove$tab.tabIndex = -1
      })
    add$tabs.forEach(
      add$tab =>
        add$tab.addEventListener('focus', onfocus__tab))
    tabs__dom.forEach(
      (tab, i) => tab.tabIndex = i)
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
      const delta = typeof delta__or__$dom === "number" && delta__or__$dom
      if (delta) {
        index__tab__dom = ((ctx.index__tab__dom || 0) + (length + (delta % length))) % length
      } else {
        index__tab__dom = tabs__dom.indexOf(delta__or__$dom)
      }
    } else {
      index__tab__dom = 0
    }
    agent.set({index__tab__dom})
    if (ctx.tab__dom) ctx.tab__dom.focus()
  }
  function on$keydown(e) {
    log(`${logPrefix}|tabs__dom__agent|on$keydown`, e)
    if(e.keyCode === 9 && e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
      navigate__backward()
    } else if (e.keyCode === 9 && !e.getModifierState(e.key)) {
      e.preventDefault()
      navigate__forward()
    }
  }
}