/**
 * agents for html layout
 * @module ctx-core/search/agent
 */
import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/search/agent'
export function opened__search__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|opened__search__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'opened__search__agent',
    scope: ['opened__search'],
    init,
    toggle,
    close__not_desktop
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function toggle() {
    log(`${logPrefix}|opened__search__agent|toggle`)
    agent.set({
      opened__search: !ctx.opened__search
    })
  }
  function close__not_desktop() {
    log(`${logPrefix}|opened__search__agent|close__not_desktop`)
    if (document.body.clientWidth < 768) {
      agent.set({opened__search: false})
    }
  }
}
export function focused__search__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|focused__search__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'focused__search__agent',
    scope: ['focused__search'],
    init,
    toggle
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function toggle() {
    log(`${logPrefix}|focused__search__agent|toggle`)
    agent.set({
      focused__search: !ctx.focused__search
    })
  }
}