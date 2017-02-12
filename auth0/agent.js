import {ensure__agent,set__false_if_null} from 'ctx-core/agent/lib'
import {init__localStorage__agent
      , store__localStorage__agent} from 'ctx-core/localStorage/agent'
import {log,error__log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/agent'
export function authResult__auth0__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|authResult__auth0__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'authResult__auth0__agent',
    scope: ['authResult__auth0'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|authResult__auth0__agent|init`)
    agent = this
    init__localStorage__agent(agent)
    set__false_if_null(agent)
    agent.pick__on({on$change__authResult__auth0})
  }
  function on$change__authResult__auth0() {
    log(`${logPrefix}|authResult__auth0__agent|on$change__authResult__auth0`)
    store__localStorage__agent(agent)
  }
}
export function accessToken__auth0__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|accessToken__auth0__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'accessToken__auth0__agent',
    scope: ['accessToken__auth0'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|accessToken__auth0__agent|init`)
    authResult__auth0__agent(ctx)
    agent = this
    refresh()
    ctx.authResult__auth0__agent.pick__on({on$change__authResult__auth0})
  }
  function on$change__authResult__auth0() {
    log(`${logPrefix}|accessToken__auth0__agent|on$change__authResult__auth0`)
    refresh()
  }
  function refresh() {
    log(`${logPrefix}|accessToken__auth0__agent|refresh`)
    const {authResult__auth0} = ctx
        , accessToken__auth0 =
            (authResult__auth0 && authResult__auth0.accessToken)
            || false
    agent.set({accessToken__auth0})
  }
}
export function profile__auth0__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|profile__auth0__agent`)
  accessToken__auth0__agent(ctx)
  lock__auth0__agent(ctx)
  let agent
  return ensure__agent(ctx, {
    key: 'profile__auth0__agent',
    scope: ['profile__auth0'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|profile__auth0__agent|init`)
    agent = this
    ctx.accessToken__auth0__agent.pick__on({on$change__accessToken__auth0})
    refresh()
  }
  function on$change__accessToken__auth0() {
    log(`${logPrefix}|profile__auth0__agent|on$change__accessToken__auth0`)
    refresh()
  }
  function refresh() {
    log(`${logPrefix}|profile__auth0__agent|refresh`)
    const {accessToken__auth0
        , lock__auth0} = ctx
    if (!accessToken__auth0 || !lock__auth0) {
      log(`${logPrefix}|profile__auth0__agent|refresh|-accessToken`)
      agent.set({
        profile__auth0:
          (accessToken__auth0 == null || lock__auth0 == null)
          ? null
          : false
      })
      return
    }
    log(`${logPrefix}|profile__auth0__agent|refresh|+accessToken`)
    ctx.lock__auth0.getUserInfo(accessToken__auth0, (error, profile) => {
      log(`${logPrefix}|profile__auth0__agent|getUserInfo`, {profile})
      if (error) {
        error__log(`${logPrefix}|profile__auth0__agent|getUserInfo|error`, {error})
        ctx.accessToken__auth0__agent.clear()
        agent.clear()
        return
      }
      agent.set({profile__auth0: profile})
    })
  }
}
export function lock__auth0__agent(ctx, ...agent$ctx$$) {
  return ensure__agent(ctx, {
    key: 'lock__auth0__agent',
    scope: ['lock__auth0', 'logout__auth0']
  }, ...agent$ctx$$)
}