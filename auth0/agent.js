import {ensure__agent
      , set__false_if_null} from 'ctx-core/agent/lib'
import {get__userinfo__auth0} from 'ctx-core/auth0/fetch'
import {promise$catch} from 'ctx-core/promise/lib'
import {init__localStorage__agent
      , store__localStorage__agent} from 'ctx-core/localStorage/agent'
import {log,error__log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/agent'
export function tokens__auth0__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|tokens__auth0__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'tokens__auth0__agent',
    scope: ['tokens__auth0'],
    init
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|tokens__auth0__agent|init`)
    agent = this
    init__localStorage__agent(agent)
    set__false_if_null(agent)
    agent.pick__on({on$change__tokens__auth0})
  }
  function on$change__tokens__auth0() {
    log(`${logPrefix}|tokens__auth0__agent|on$change__tokens__auth0`)
    store__localStorage__agent(agent)
  }
}
export function access_token__auth0__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|access_token__auth0__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'access_token__auth0__agent',
    scope: ['access_token__auth0'],
    init
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|access_token__auth0__agent|init`)
    tokens__auth0__agent(ctx)
    agent = this
    refresh()
    ctx.tokens__auth0__agent.pick__on({on$change__tokens__auth0})
  }
  function on$change__tokens__auth0() {
    log(`${logPrefix}|access_token__auth0__agent|on$change__tokens__auth0`)
    refresh()
  }
  function refresh() {
    log(`${logPrefix}|access_token__auth0__agent|refresh`)
    const {tokens__auth0} = ctx
        , access_token__auth0 =
            (tokens__auth0 && tokens__auth0.access_token)
            || false
    agent.set({access_token__auth0})
  }
}
export function profile__auth0__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|profile__auth0__agent`)
  access_token__auth0__agent(ctx)
  let agent
  return ensure__agent(ctx, {
    key: 'profile__auth0__agent',
    scope: ['profile__auth0'],
    init
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|profile__auth0__agent|init`)
    agent = this
    ctx.access_token__auth0__agent.pick__on({on$change__access_token__auth0})
    promise$catch(ctx, refresh())
  }
  function on$change__access_token__auth0() {
    log(`${logPrefix}|profile__auth0__agent|on$change__access_token__auth0`)
    promise$catch(ctx, refresh())
  }
  async function refresh() {
    log(`${logPrefix}|profile__auth0__agent|refresh`)
    const {access_token__auth0} = ctx
    if (!access_token__auth0) {
      log(`${logPrefix}|profile__auth0__agent|refresh|-access_token`)
      agent.set({
        profile__auth0:
          (access_token__auth0 == null)
          ? null
          : false
      })
      return
    }
    log(`${logPrefix}|profile__auth0__agent|refresh|+access_token`)
    let response
    try {
      response = await get__userinfo__auth0(ctx)
    } catch (error) {
      error__log(`${logPrefix}|profile__auth0__agent|getUserInfo|error`, {error})
      ctx.access_token__auth0__agent.clear()
      agent.clear()
    }
    const profile = await response.json()
    agent.set({profile__auth0: profile})
  }
}
export function lock__auth0__agent(ctx, ...ctx__agent$$) {
  return ensure__agent(ctx, {
    key: 'lock__auth0__agent',
    scope: ['lock__auth0', 'logout__auth0']
  }, ...ctx__agent$$)
}