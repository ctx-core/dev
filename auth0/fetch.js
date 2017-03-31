import {assign} from 'ctx-core/object/lib'
import {fetch} from 'ctx-core/fetch/lib'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/fetch'
export function get__userinfo__auth0(ctx) {
  log(`${logPrefix}|get__userinfo__auth0`)
  const {access_token__auth0} = ctx
  if (!access_token__auth0) throw__missing_argument(ctx, {
    key: 'ctx.access_token__auth0'
  })
  return fetch('https://censible.auth0.com/userinfo', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token__auth0}`
    }
  })
}
export function post__signup__dbconnections__auth0(ctx, form) {
  log(`${logPrefix}|fetch__signup`)
  const body = $body(form)
  return fetch(`https://${ctx.AUTH0_DOMAIN}/dbconnections/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
}
export function post__login__auth0(ctx, form) {
  log(`${logPrefix}|post__login__auth0`)
  const body = $body(form)
  return fetch(`https://${ctx.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
}
function $body(...form) {
  return assign({
          client_id: ctx.AUTH0_CLIENT_ID,
          grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
          realm: 'Username-Password-Authentication'
        }, ...form)
}