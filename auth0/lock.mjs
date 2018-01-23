import {assign} from 'ctx-core/object/lib'
import {agent__access_token__auth0
      , agent__profile__auth0
      , agent__Auth0Lock} from 'ctx-core/auth0/agent'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/lock.mjs'
export function ensure__Auth0Lock(ctx, options) {
  log(`${logPrefix}|ensure__Auth0Lock`)
  agent__Auth0Lock(ctx)
  if (ctx.Auth0Lock) return ctx
  ctx.agent__Auth0Lock.set({
    Auth0Lock: $Auth0Lock(ctx, options),
    logout__Auth0Lock: $logout__Auth0Lock(ctx)
  })
  return ctx
}
export function $Auth0Lock(ctx, options) {
  log(`${logPrefix}|$Auth0Lock`)
  return new Auth0Lock(ctx.AUTH0_CLIENT_ID, ctx.AUTH0_DOMAIN, options)
}
function $logout__Auth0Lock(ctx) {
  log(`${logPrefix}|$logout__Auth0Lock`)
  return function() {
    return logout__Auth0Lock(ctx, ...arguments)
  }
}
export function logout__Auth0Lock(ctx, ...array__opts) {
  log(`${logPrefix}|logout__Auth0Lock`)
  const {Auth0Lock} = ctx
  if (Auth0Lock) {
    const opts =
            assign(
              {client_id: ctx.AUTH0_CLIENT_ID},
              ...array__opts)
    if (!opts.returnTo)
      throw__missing_argument(ctx, {key: 'opts.returnTo'})
    agent__access_token__auth0(ctx)
    agent__profile__auth0(ctx)
    ctx.agent__token__auth0.clear()
    Auth0Lock.logout(opts)
  }
  return ctx
}