import {ensure__agent} from 'ctx-core/agent/lib'
import {get__userinfo__auth0} from 'ctx-core/auth0/fetch'
import {set__false__if__null} from 'ctx-core/agent/lib'
import {init__localStorage__agent
      , store__localStorage__agent} from 'ctx-core/localStorage/agent'
import {agent__email} from 'ctx-core/email/agent'
import deepEqual from 'deep-equal'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/agent.mjs'
export function agent__token__auth0(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__token__auth0',
    scope: ['token__auth0'],
    init,
    logout
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__token__auth0|init`)
    agent = this
  }
  function logout() {
    log(`${logPrefix}|agent__token__auth0|logout`)
    agent.set({token__auth0: false})
  }
}
export function agent__localStorage__token__auth0(ctx) {
  const agent = agent__token__auth0(...arguments)
      , scope__ = agent.scope[0]
  if (!agent.store__localStorage__agent) {
    agent.store__localStorage__agent = store__localStorage__agent
    init__localStorage__agent(agent, scope__)
    set__false__if__null(agent)
    agent.on('change', __change__agent__token__auth0)
    window.addEventListener('storage', __storage)
  }
  return agent
  function __change__agent__token__auth0() {
    log(`${logPrefix}|agent__localStorage__token__auth0|__change__agent__token__auth0`)
    store__localStorage__agent(agent, scope__)
  }
  function __storage(e) {
    log(`${logPrefix}|agent__localStorage__token__auth0|__storage`)
    const {key} = e
    if (key === scope__) {
      const {newValue} = e
          , value__scope__ = ctx[scope__]
      if (!value__scope__ && !newValue) return
      const newValue__ = JSON.parse(newValue)
      if (!deepEqual(value__scope__, newValue__)) {
        const ctx__set = {}
        ctx__set[scope__] = newValue__
        agent.set(ctx__set)
      }
    }
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
    agent__token__auth0(ctx)
    ctx.agent__token__auth0.on('change',
      __change__agent__token__auth0)
  }
  function __change__agent__token__auth0() {
    log(`${logPrefix}|agent__access_token__auth0|__change__agent__token__auth0`)
    agent.reset()
  }
  function reset() {
    log(`${logPrefix}|agent__access_token__auth0|refresh`)
    const {token__auth0} = ctx
        , access_token__auth0 =
            token__auth0
            && token__auth0.access_token
    agent.set({access_token__auth0})
  }
}
export function agent__profile__auth0(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__profile__auth0',
    scope: ['profile__auth0'],
    init,
    reset
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__profile__auth0|init`)
    agent = this
    agent__access_token__auth0(ctx)
    ctx.agent__access_token__auth0.on('change',
      __change__agent__access_token__auth0)
    agent.reset()
  }
  function __change__agent__access_token__auth0() {
    log(`${logPrefix}|agent__profile__auth0|__change__agent__access_token__auth0`)
    agent.reset()
  }
  async function reset() {
    log(`${logPrefix}|agent__profile__auth0|reset`)
    const {access_token__auth0} = ctx
    if (!access_token__auth0) {
      log(`${logPrefix}|agent__profile__auth0|reset|-access_token`)
      agent.set({
        profile__auth0:
          access_token__auth0 == null
          ? null
          : false
      })
      return
    }
    log(`${logPrefix}|agent__profile__auth0|reset|+access_token`)
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
    ctx.agent__token__auth0.set({token__auth0: false})
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
export function agent__email__auth0(ctx, ...array__opts) {
  let agent
  return agent__email(ctx, {
    init
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__email__auth0|init`)
    agent = this
    agent__profile__auth0(ctx)
    ctx.agent__profile__auth0.on('change',
      __change__agent__profile__auth0)
    refresh()
  }
  function __change__agent__profile__auth0() {
    log(`${logPrefix}|agent__email__auth0|__change__agent__profile__auth0`)
    refresh()
  }
  function refresh() {
    log(`${logPrefix}|agent__email__auth0|refresh`)
    const {profile__auth0} = ctx
        , email =
            (profile__auth0 == false)
            ? false
            : profile__auth0
              && profile__auth0.email
    agent.set({email})
  }
}
export function agent__auth0(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__auth0',
    scope:
      [ 'view__auth0',
        'class__opened__auth0'],
    init,
    reset,
    open__login,
    open__signup,
    open__forgot_password,
    open__forgot_password__check_email,
    open__change_password,
    close,
    logout
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__auth0|init`)
    agent = this
    agent__email__auth0(ctx)
    agent__localStorage__token__auth0(ctx)
    ctx.agent__email.on('change',
      __change__agent__email)
    function __change__agent__email() {
      log(`${logPrefix}|agent__auth0|__change__agent__email`)
      agent.reset()
    }
  }
  function reset() {
    log(`${logPrefix}|agent__auth0|reset`)
    const {email} = ctx
        , view__auth0 =
            { is__loggedin: !!email,
              is__loggedout:
                email != null
                && !email,
              get opened__dialog() {
                return ctx.class__opened__auth0
              },
              get closed__dialog() {
                return !this.opened__dialog
              }
            }
        , class__opened__auth0__ = ctx.class__opened__auth0
        , class__opened__auth0 =
            email
            ? false
            : ( class__opened__auth0__ == 'login'
                && class__opened__auth0__ == 'signup')
              ? class__opened__auth0__
              : class__opened__auth0__
                ? 'login'
                : false
    agent.set(
      { view__auth0
      , class__opened__auth0})
  }
  function open__login() {
    log(`${logPrefix}|agent__auth0|open__login`)
    agent.set({class__opened__auth0: 'login'})
  }
  function open__signup() {
    log(`${logPrefix}|agent__auth0|open__signup`)
    agent.set({class__opened__auth0: 'signup'})
  }
  function open__forgot_password() {
    log(`${logPrefix}|agent__auth0|open__forgot_password`)
    agent.set({class__opened__auth0: 'forgot_password'})
  }
  function open__forgot_password__check_email() {
    log(`${logPrefix}|agent__auth0|open__forgot_password__check_email`)
    agent.set({class__opened__auth0: 'forgot_password__check_email'})
  }
  function open__change_password() {
    log(`${logPrefix}|agent__auth0|open__change_password`)
    agent.set({class__opened__auth0: 'change_password'})
  }
  function close() {
    log(`${logPrefix}|agent__auth0|close`)
    agent.set({class__opened__auth0: false})
  }
  function logout() {
    log(`${logPrefix}|logout`)
    ctx.agent__token__auth0.logout()
  }
}
