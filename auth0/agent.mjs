import {assign
      , set__false__if__null} from 'ctx-core/object/lib.mjs'
import {ensure__agent} from 'ctx-core/agent/lib.mjs'
import {$ctx__set__from__localStorage
      , store__localStorage} from 'ctx-core/localStorage/agent.mjs'
import {agent__email} from 'ctx-core/email/agent'
import {$waitfor__ratelimit__backoff__fibonacci} from 'ctx-core/fetch/lib.mjs'
import {validate__current__token__auth0} from 'ctx-core/auth0/lib.mjs'
import {get__userinfo__auth0} from 'ctx-core/auth0/fetch.mjs'
import {_exp__token__jwt} from 'ctx-core/jwt/lib.mjs'
import {$now__millis} from 'ctx-core/time/lib.mjs'
import deepEqual from 'deep-equal'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/agent.mjs'
export function agent__token__auth0(ctx, ...array__opts) {
  let agent = ctx.agent__token__auth0
  if (agent) return agent
  const scope__json__token__auth0 = 'json__token__auth0'
  return ensure__agent(ctx, {
    key: 'agent__token__auth0',
    scope:
      [ 'token__auth0',
        scope__json__token__auth0,
        'errors__token__auth0'],
    init,
    before__change,
    after__change,
    logout
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__token__auth0|init`)
    agent = this
    const ctx__set =
            $ctx__set__from__localStorage(
              scope__json__token__auth0)
    agent.set(
      set__false__if__null(
        ctx__set,
        scope__json__token__auth0))
    window.addEventListener('storage', __storage)
  }
  function before__change(ctx__change) {
    log(`${logPrefix}|agent__token__auth0|before__change`)
    const { json__token__auth0
          , token__auth0
          } = ctx__change
    if (json__token__auth0 && !token__auth0) {
      const token__auth0__ = JSON.parse(json__token__auth0)
          , {error} = token__auth0__
      if (error) {
        const errors__token__auth0 =
                { email:
                    token__auth0__.error_description}
        assign(
          ctx__change,
          { errors__token__auth0,
            token__auth0: false})
        setTimeout(() =>
          agent__auth0(ctx).open__login())
      } else {
        ctx__change.token__auth0 =
          token__auth0__
      }
    } else if (token__auth0 && !json__token__auth0) {
      ctx__change.json__token__auth0 =
        JSON.stringify(token__auth0)
    } else if (!json__token__auth0) {
      ctx__change.token__auth0 = false
      ctx__change.json__token__auth0 = false
    }
  }
  function after__change(ctx__change) {
    log(`${logPrefix}|agent__token__auth0|after__change`)
    store__localStorage(ctx__change, scope__json__token__auth0)
    schedule__validate__current__token__auth0()
  }
  function logout() {
    log(`${logPrefix}|agent__token__auth0|logout`)
    agent.set({token__auth0: false})
  }
  function schedule__validate__current__token__auth0() {
    const {token__auth0} = ctx
        , id_token =
            token__auth0
            && token__auth0.id_token
    if (!id_token) return
    const exp__token__jwt =
            _exp__token__jwt(id_token)
        , now__millis = $now__millis()
        , millis__validate = now__millis - exp__token__jwt
    setTimeout(
      () => validate__current__token__auth0(ctx),
      millis__validate)
  }
  function __storage(e) {
    log(`${logPrefix}|agent__token__auth0|__storage`)
    const {key} = e
    if (key === scope__json__token__auth0) {
      const {newValue} = e
          , {token__auth0} = ctx
      if (!token__auth0 && !newValue) return
      const token__auth0__ = JSON.parse(newValue)
      if (!deepEqual(token__auth0, token__auth0__)) {
        const ctx__set = {token__auth0: token__auth0__}
        agent.set(ctx__set)
      }
    }
  }
}
export function agent__userinfo__auth0(ctx, ...array__opts) {
  let agent = ctx.agent__userinfo__auth0
  if (agent) return agent
  return ensure__agent(ctx, {
    key: 'agent__userinfo__auth0',
    scope:
      [ 'userinfo__auth0',
        'token__auth0__userinfo__auth0'],
    init,
    reset
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__userinfo__auth0|init`)
    agent = this
    agent__token__auth0(ctx).on('change',
      __change__agent__token__auth0)
  }
  function __change__agent__token__auth0() {
    log(`${logPrefix}|agent__userinfo__auth0|__change__agent__token__auth0`)
    agent.reset()
  }
  async function reset() {
    log(`${logPrefix}|agent__userinfo__auth0|reset`)
    const {token__auth0} = ctx
    if (token__auth0 === ctx.token__auth0__userinfo__auth0) {
      return
    }
    if (!token__auth0) {
      const userinfo__auth0__no__token__auth0 =
              $userinfo__auth0__no__token__auth0()
      agent.set(
        { userinfo__auth0:
            userinfo__auth0__no__token__auth0})
      return
    }
    const token__auth0__userinfo__auth0 = token__auth0
    agent.set({token__auth0__userinfo__auth0})
    const response =
            await $waitfor__ratelimit__backoff__fibonacci(
              () => get__userinfo__auth0(ctx))
    if (!response.ok) {
      agent__token__auth0(ctx).clear(false)
      return
    }
    const userinfo__auth0 = await response.json()
    agent.set({userinfo__auth0})
    function $userinfo__auth0__no__token__auth0() {
      const userinfo__auth0__no__token__auth0 =
              token__auth0 == null
              ? null
              : false
      return userinfo__auth0__no__token__auth0
    }
  }
}
export function agent__Auth0Lock(ctx, ...array__opts) {
  let agent = ctx.agent__Auth0Lock
  if (agent) return agent
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
    agent__userinfo__auth0(ctx).on('change',
      __change__agent__userinfo__auth0)
    refresh()
  }
  function __change__agent__userinfo__auth0() {
    log(`${logPrefix}|agent__email__auth0|__change__agent__userinfo__auth0`)
    refresh()
  }
  function refresh() {
    log(`${logPrefix}|agent__email__auth0|refresh`)
    const {userinfo__auth0} = ctx
        , email =
            (userinfo__auth0 == false)
            ? false
            : userinfo__auth0
              && userinfo__auth0.email
    agent.set({email})
  }
}
export function agent__auth0(ctx, ...array__opts) {
  let agent = ctx.agent__auth0
  if (agent) return agent
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
    agent__email__auth0(ctx).on('change',
      __change__agent__email)
    agent__token__auth0(ctx)
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
    agent__token__auth0(ctx).logout()
  }
}
