import {assign} from 'ctx-core/object/lib'
import {agent__access_token__auth0
      , agent__profile__auth0
      , agent__lock__auth0} from 'ctx-core/auth0/agent'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/lock.mjs'
export function ensure__lock__auth0(ctx, options) {
  log(`${logPrefix}|ensure__lock__auth0`)
  agent__lock__auth0(ctx)
  if (ctx.lock__auth0) return ctx
  ctx.agent__lock__auth0.set({
    lock__auth0: $lock__auth0(ctx, options),
    logout__auth0: $logout__auth0(ctx)
  })
  return ctx
}
export function $lock__auth0(ctx, options) {
  log(`${logPrefix}|$lock__auth0`)
  return new Auth0Lock(ctx.AUTH0_CLIENT_ID, ctx.AUTH0_DOMAIN, options)
}
function $logout__auth0(ctx) {
  log(`${logPrefix}|$logout__auth0`)
  return function() {
    return logout__auth0(ctx, ...arguments)
  }
}
export function logout__auth0(ctx, ...array__opts) {
  log(`${logPrefix}|logout__auth0`)
  const {lock__auth0} = ctx
  if (lock__auth0) {
    const opts =
            assign({client_id: ctx.AUTH0_CLIENT_ID}, ...array__opts)
    if (!opts.returnTo)
      throw__missing_argument(ctx, {key: 'opts.returnTo'})
    agent__access_token__auth0(ctx)
    agent__profile__auth0(ctx)
    ctx.agent__tokens__auth0.clear()
    lock__auth0.logout(opts)
  }
  return ctx
}