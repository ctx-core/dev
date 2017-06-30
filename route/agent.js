/**
 * Route agents
 * @module ctx-core/route/agent
 */
import {ensure__agent, set as set__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/route/agent'
export function route__agent(ctx, ...ctx__agent$$) {
  let agent
  return ensure__agent(ctx, {
    key: 'route__agent',
    scope: [
      'route',
      'query__route'
    ],
    init,
    set
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|route__agent|init`)
    agent = this
  }
  async function set() {
    set__agent.apply(agent, [{
      route: '',
      query__route: {}
    }, ...arguments])
  }
}