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
    toggle
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

}