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
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
    init__localStorage__agent(agent)
    set__false_if_null(agent)
    agent.pick__on({on$change__accessToken__auth0})
  }
  function on$change__accessToken__auth0() {
    log(`${logPrefix}|accessToken__auth0__agent|on$change__accessToken__auth0`)
    store__localStorage__agent(agent)
  }
}
export function profile__auth0__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|function profile__auth0__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'profile__auth0__agent',
    scope: ['profile__auth0'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
    init__localStorage__agent(agent)
    set__false_if_null(agent)
    agent.pick__on({on$change__profile__auth0})
  }
  function on$change__profile__auth0() {
    log(`${logPrefix}|profile__auth0|on$change__profile__auth0`)
    store__localStorage__agent(agent)
  }
}