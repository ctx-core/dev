import jwt from 'jsonwebtoken'
import {assign__ctx__env} from 'ctx-core/env'
import {assign} from 'ctx-core/object/lib'
import route__koa from 'koa-route'
import {$html__script__auth} from 'ctx-core/auth0/html'
import {$token__jwt__authorization__header} from 'ctx-core/jwt/lib'
import {throw__bad_credentials
      , throw__bad_gateway} from 'ctx-core/error/lib'
import {throw__response__fetch} from 'ctx-core/fetch/lib'
import {patch__user__v2__auth0
      , get__jwks__json} from 'ctx-core/auth0/fetch'
import {$token__auth0
      , $credentials__client_credentials} from 'ctx-core/auth0/management'
import {info,debug,error,log} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/koa.mjs'
export default use__auth0
export function use__auth0(app) {
  log(`${logPrefix}|use__auth0`)
  app.use(route__koa.get('/auth', get__auth))
  app.use(route__koa.post('/auth/change_password',
    post__change_password__auth))
}
export async function get__auth(ctx) {
  log(`${logPrefix}|get__auth`)
  const html = $html__script__auth(ctx)
  ctx.body = html
}
/**
 * POST /auth/change_password
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {Promise<void>}
 * @see {@link https://auth0.com/docs/api-auth/tutorials/client-credentials}
 * @see {@link https://auth0.com/docs/api-auth/tutorials/client-credentials/customize-with-hooks}
 */
export async function post__change_password__auth(ctx) {
  log(`${logPrefix}|post__change_password__auth`)
  assign__ctx__env(ctx)
  const {AUTH0_DOMAIN} = ctx
      , user_id = await $user_id__jwt__verify(ctx)
      , credentials__client_credentials =
          assign($credentials__client_credentials(ctx), {
            // scope: 'read:users'
          })
      , token__auth0 =
          await $token__auth0(ctx, credentials__client_credentials)
      , {body} = ctx.request
      , {password} = body
      , ctx__patch__user__v2__auth0 =
          { AUTH0_DOMAIN,
            token__auth0,
            user_id}
      , response =
          await patch__user__v2__auth0(
            ctx__patch__user__v2__auth0,
            {password})
      , user = await response.json()
  if (user.error) {
    error(`${logPrefix}|post__change_password__auth|patch__user__v2__auth0|error`)
    error(`${user.statusCode} ${user.error}`)
    error(user.message)
    error(JSON.stringify(ctx__patch__user__v2__auth0, null, 2))
  }
  if (!user.user_id) {
    throw__bad_gateway(ctx, {
      status__http: response.status
    })
  }
  ctx.body = JSON.stringify({status: 200})
}
export async function $user_id__jwt__verify(ctx) {
  const decoded__token__jwt =
          await $decoded__token__jwt__koa(ctx)
      , user_id =
          decoded__token__jwt
          && (decoded__token__jwt.user_id
              || decoded__token__jwt.sub)
  return user_id
}
export async function $email__jwt__verify(ctx) {
  log(`${logPrefix}|$email__jwt__verify`)
  const decoded__token__jwt =
          await $decoded__token__jwt__koa(ctx)
      , {email} = decoded__token__jwt
  return email
}
export function $decoded__token__jwt__koa(ctx) {
  log(`${logPrefix}|$decoded__token__jwt__koa`)
  const {request} = ctx
      , header = request && request.header
      , authorization__header =
          header
          && header.authorization
      , token__jwt =
          $token__jwt__authorization__header(authorization__header)
  if (!token__jwt) {
    throw__bad_credentials(ctx)
  }
  return $decoded__token__jwt(ctx, token__jwt)
}
export async function $decoded__token__jwt(ctx, token__jwt) {
  log(`${logPrefix}|$decoded__token__jwt`)
  const cert__jwks = await $cert__jwks(ctx)
      , decoded__token__auth0 =
          jwt.verify(
            token__jwt,
            cert__jwks)
  return decoded__token__auth0
}
export async function $cert__jwks(ctx) {
  log(`${logPrefix}|$cert__jwks`)
  const x5c__jwks = await $x5c__jwks(ctx)
      , cert__jwks__ = x5c__jwks[0]
      , cert__jwks =
          [ '-----BEGIN CERTIFICATE-----',
            cert__jwks__,
            '-----END CERTIFICATE-----'
          ].join('\n')
  return cert__jwks
}
export async function $x5c__jwks(ctx) {
  log(`${logPrefix}|$x5c__jwks`)
  const response = await get__jwks__json(ctx)
  if (!response.ok) {
    throw__response__fetch(ctx, response)
  }
  const jwks__json = await response.json()
      , {keys} = jwks__json
      , key = keys[0]
      , {x5c} = key
  return x5c
}
