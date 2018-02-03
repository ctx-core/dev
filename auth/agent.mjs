import {assign,clone} from 'ctx-core/object/lib'
import {clear__core} from 'ctx-core/agent/lib'
import {ensure__agent__rpc} from 'ctx-core/agent/rpc'
import {load__ctx__localStorage
      , assign__ctx__localStorage
      , remove__ctx__localStorage} from 'ctx-core/localStorage/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth/agent.mjs'
export function $ctx__agent__authentication(ctx) {
  log(`${logPrefix}|$ctx__agent__authentication`)
  let agent, scope$
  return {
    init,
    authenticate,
    clear
  }
  function init() {
    log(`${logPrefix}|$ctx__agent__authentication|init`)
    agent = this
    scope$ = agent.scope$
    agent.set(load__ctx__localStorage())
  }
  async function authenticate(ctx__reset) {
    log(`${logPrefix}|$ctx__agent__authentication|authenticate`)
    await agent.reset(ctx__reset)
    let ctx__localStorage = {}
    ctx__localStorage[scope$] = ctx[scope$]
    assign__ctx__localStorage(ctx__localStorage)
    return ctx
  }
  function clear() {
    log(`${logPrefix}|$ctx__agent__authentication|clear`)
    remove__ctx__localStorage(scope$)
    return clear__core.apply(agent, arguments)
  }
}
export function agent__rpc__authentication(ctx, ...array__opts) {
  let agent = ctx.agent__rpc__authentication
  if (agent) return agent
  return ensure__agent__rpc(ctx, $ctx__agent__authentication(ctx), {
    key: 'agent__rpc__authentication',
    scope: ['rpc__authentication'],
    rpc: ['rpc__oauth2'],
    init,
    reset,
    $ctx__rpc
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__rpc__authentication|init`)
    agent = this
  }
  async function reset() {
    log(`${logPrefix}|agent__rpc__authentication|reset`)
    const ctx__reset = clone(...arguments)
    if (ctx__reset.username && ctx__reset.password) {
      return agent.reset__rpc(ctx__reset)
    }
  }
  function $ctx__rpc(ctx__reset, ...ctx__reset$rest$$) {
    log(`${logPrefix}|agent__rpc__authentication|$ctx__rpc`)
    return assign(ctx__reset, {
      grant_type: 'password',
      client_id: ctx.client_id,
      client_secret: ctx.client_secret
    }, ...ctx__reset$rest$$)
  }
}