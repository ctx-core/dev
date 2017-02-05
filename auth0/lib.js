import {assign} from 'ctx-core/object/lib'
import {accessToken__auth0__agent
      , profile__auth0__agent} from 'ctx-core/auth0/agent'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/lib'
export function ensure__lock__auth0(ctx, options) {
  log(`${logPrefix}|ensure__lock__auth0`)
  if (ctx.lock__auth0) return ctx
  assign(ctx, {
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
export function logout__auth0(ctx, ...opts$$) {
  log(`${logPrefix}|logout__auth0`)
  const {lock__auth0} = ctx
  if (lock__auth0) {
    const opts = assign({client_id: ctx.AUTH0_CLIENT_ID}, ...opts$$)
    if (!opts.returnTo) throw__missing_argument(ctx, {key: 'opts.returnTo'})
    accessToken__auth0__agent(ctx)
    profile__auth0__agent(ctx)
    ctx.accessToken__auth0__agent.clear()
    ctx.profile__auth0__agent.clear()
    lock__auth0.logout(opts)
  }
  return ctx
}