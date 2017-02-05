import {ensure__agent,set__false_if_null} from 'ctx-core/agent/lib'
import {init__localStorage__agent
      , store__localStorage__agent} from 'ctx-core/localStorage/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/agent'
export function accessToken__auth0__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|accessToken__auth0__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'accessToken__auth0__agent',
    scope: ['accessToken__auth0'],
    init,
    after__set
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
    init__localStorage__agent(agent)
    set__false_if_null(agent)
  }
  function after__set() {
    log(`${logPrefix}|after__set`)
    store__localStorage__agent(agent)
  }
}
export function profile__auth0__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|function profile__auth0__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'profile__auth0__agent',
    scope: ['profile__auth0'],
    init,
    after__set
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
    init__localStorage__agent(agent)
    set__false_if_null(agent)
  }
  function after__set() {
    log(`${logPrefix}|after__set`)
    store__localStorage__agent(agent)
  }
}