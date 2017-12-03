import {ensure__agent} from 'ctx-core/agent/lib'
import {get__userinfo__auth0} from 'ctx-core/auth0/fetch'
import {set__false_if_null} from 'ctx-core/agent/lib'
import {init__agent__localStorage
      , store__agent__localStorage} from 'ctx-core/localStorage/agent'
import {promise$catch} from 'ctx-core/promise/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/agent'
export function agent__tokens__auth0(ctx, ...array__opts) {
  log(`${logPrefix}|agent__tokens__auth0`)
  return ensure__agent(ctx, {
    key: 'agent__tokens__auth0',
    scope: ['tokens__auth0']
  }, ...array__opts)
}
export function agent__localStorage__tokens__auth0(ctx) {
  log(`${logPrefix}|agent__localStorage__tokens__auth0`)
  const agent = agent__tokens__auth0(...arguments)
  if (!agent.store__agent__localStorage) {
    agent.store__agent__localStorage = store__agent__localStorage
    init__agent__localStorage(agent)
    set__false_if_null(agent)
    agent.on('change', on$change__tokens__auth0)
  }
  return agent
  function on$change__tokens__auth0() {
    log(`${logPrefix}|agent__tokens__auth0|on$change__tokens__auth0`)
    store__agent__localStorage(agent)
  }
}
export function agent__access_token__auth0(ctx, ...array__opts) {
  log(`${logPrefix}|agent__access_token__auth0`)
  let agent
  return ensure__agent(ctx, {
    key: 'agent__access_token__auth0',
    scope: ['access_token__auth0'],
    init
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__access_token__auth0|init`)
    agent__tokens__auth0(ctx)
    agent = this
    refresh()
    ctx.agent__tokens__auth0.on('change', on$change__tokens__auth0)
  }
  function on$change__tokens__auth0() {
    log(`${logPrefix}|agent__access_token__auth0|on$change__tokens__auth0`)
    refresh()
  }
  function refresh() {
    log(`${logPrefix}|agent__access_token__auth0|refresh`)
    const {tokens__auth0} = ctx
        , access_token__auth0 =
            (tokens__auth0 && tokens__auth0.access_token)
            || false
    agent.set({access_token__auth0})
  }
}
export function agent__profile__auth0(ctx, ...array__opts) {
  log(`${logPrefix}|agent__profile__auth0`)
  agent__access_token__auth0(ctx)
  let agent
  return ensure__agent(ctx, {
    key: 'agent__profile__auth0',
    scope: ['profile__auth0'],
    init
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__profile__auth0|init`)
    agent = this
    ctx.agent__access_token__auth0.on('change', on$change__access_token__auth0)
    promise$catch(ctx, refresh())
  }
  function on$change__access_token__auth0() {
    log(`${logPrefix}|agent__profile__auth0|on$change__access_token__auth0`)
    promise$catch(ctx, refresh())
  }
  async function refresh() {
    log(`${logPrefix}|agent__profile__auth0|refresh`)
    const {access_token__auth0} = ctx
    if (!access_token__auth0) {
      log(`${logPrefix}|agent__profile__auth0|refresh|-access_token`)
      agent.set({
        profile__auth0:
          access_token__auth0 == null
          ? null
          : false
      })
      return
    }
    log(`${logPrefix}|agent__profile__auth0|refresh|+access_token`)
    const response = await get__userinfo__auth0(ctx)
    if (response.status >= 400) {
      clear()
      return
    }
    const profile__auth0 = await response.json()
    agent.set({profile__auth0})
  }
  function clear() {
    log(`${logPrefix}|agent__profile__auth0|clear`)
    ctx.agent__tokens__auth0.set({tokens__auth0: false})
    agent.set({profile__auth0: false})
  }
}
export function agent__lock__auth0(ctx, ...array__opts) {
  return ensure__agent(ctx, {
    key: 'agent__lock__auth0',
    scope: ['lock__auth0', 'logout__auth0']
  }, ...array__opts)
}