import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/lib'
export function $lock__auth0(ctx) {
  log(`${logPrefix}|$lock__auth0`)
  return new Auth0Lock(ctx.AUTH0_CLIENT_ID, ctx.AUTH0_DOMAIN)
}