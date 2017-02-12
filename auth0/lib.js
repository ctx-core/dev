import {assign} from 'ctx-core/object/lib'
import {fetch} from 'ctx-core/fetch/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/lib'
export function ensure__get__ssodata__auth0() {
  log(`${logPrefix}|ensure__get__ssodata__auth0`)
  if (ctx.get__ssodata__auth0) return ctx
  assign(ctx, {get__ssodata__auth0})
  return ctx
}
export function get__ssodata__auth0() {
  log(`${logPrefix}|get__ssodata__auth0`)
  return fetch('https://censible.auth0.com/user/ssodata', {
    credentials: 'include'
  })
}