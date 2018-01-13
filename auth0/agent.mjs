import {ensure__agent} from 'ctx-core/agent/lib'
import {get__userinfo__auth0} from 'ctx-core/auth0/fetch'
import {set__false__if__null} from 'ctx-core/agent/lib'
import {init__agent__localStorage
      , store__agent__localStorage} from 'ctx-core/localStorage/agent'
import {promise__catch} from 'ctx-core/promise/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/agent.mjs'
export function agent__tokens__auth0(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__tokens__auth0',
    scope: ['tokens__auth0'],
    init,
    logout
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function logout() {
    log(`${logPrefix}|logout`)
    agent.set({tokens__auth0: false})
  }
}
export function agent__localStorage__tokens__auth0(ctx) {
  const agent = agent__tokens__auth0(...arguments)
  if (!agent.store__agent__localStorage) {
    agent.store__agent__localStorage = store__agent__localStorage
    init__agent__localStorage(agent)
    set__false__if__null(agent)
    agent.on('change', __change__agent__tokens__auth0)
  }
  return agent
  function __change__agent__tokens__auth0() {
    log(`${logPrefix}|agent__tokens__auth0|__change__agent__tokens__auth0`)
    store__agent__localStorage(agent)
  }
}
export function agent__access_token__auth0(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__access_token__auth0',
    scope: ['access_token__auth0'],
    init,
    reset
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__access_token__auth0|init`)
    agent = this
    agent__tokens__auth0(ctx)
    ctx.agent__tokens__auth0.on('change',
      __change__agent__tokens__auth0)
  }
  function __change__agent__tokens__auth0() {
    log(`${logPrefix}|agent__access_token__auth0|__change__agent__tokens__auth0`)
    agent.reset()
  }
  function reset() {
    log(`${logPrefix}|agent__access_token__auth0|refresh`)
    const {tokens__auth0} = ctx
        , access_token__auth0 =
            tokens__auth0
            && tokens__auth0.access_token
    agent.set({access_token__auth0})
  }
}
export function agent__profile__auth0(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__profile__auth0',
    scope: ['profile__auth0'],
    init
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__profile__auth0|init`)
    agent = this
    agent__access_token__auth0(ctx)
    ctx.agent__access_token__auth0.on('change',
      __change__agent__access_token__auth0)
    promise__catch(ctx, refresh())
  }
  function __change__agent__access_token__auth0() {
    log(`${logPrefix}|agent__profile__auth0|__change__agent__access_token__auth0`)
    promise__catch(ctx, refresh())
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
export function agent__Auth0Lock(ctx, ...array__opts) {
  return ensure__agent(ctx, {
    key: 'agent__Auth0Lock',
    scope:
      [ 'Auth0Lock',
        'logout__Auth0Lock']
  }, ...array__opts)
}