import jwt from 'jsonwebtoken'
import {assign__ctx__env} from 'ctx-core/env'
import route__koa from 'koa-route'
import {$html__script__auth} from 'ctx-core/auth0/html'
import {$token__jwt__authorization__header} from 'ctx-core/jwt/lib'
import {throw__bad_credentials
      , throw__bad_gateway} from 'ctx-core/error/lib'
import {throw__response__fetch} from 'ctx-core/fetch/lib'
import {get__jwks__json} from 'ctx-core/auth0/fetch'
import {patch__user__v2__auth0
      , get__user__v2__auth0} from 'ctx-core/auth0/fetch.management'
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
      , {body} = ctx.request
      , {password} = body
      , ctx__request =
          { AUTH0_DOMAIN,
            user_id}
      , response =
          await patch__user__v2__auth0(
            ctx__request,
            {password})
      , user = await response.json()
  validate__user(user, ctx__request)
  ctx.body = JSON.stringify({status: 200})
}
export async function $user_id__jwt__verify(ctx) {
  const decoded__token__jwt =
          await $decoded__token__jwt__koa(ctx)
      , user_id = $user_id(decoded__token__jwt)
  return user_id
}
export function $user_id(decoded__token__jwt) {
  return (
    decoded__token__jwt
    && (decoded__token__jwt.user_id
      || decoded__token__jwt.sub)
  )
}
export async function $email__jwt__verify(ctx) {
  log(`${logPrefix}|$email__jwt__verify`)
  const decoded__token__jwt =
          await $decoded__token__jwt__koa(ctx)
  let email = decoded__token__jwt.email
  if (!email) {
    const user_id = $user_id(decoded__token__jwt)
        , {AUTH0_DOMAIN} = ctx
        , ctx__request =
            { AUTH0_DOMAIN,
              user_id}
        , response =
            await get__user__v2__auth0(
              ctx__request)
        , user = await response.json()
    validate__user(user, ctx__request)
    email = user.email
  }
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
export async function $user(ctx) {
  const response =
    await $waitfor__ratelimit__backoff__fibonacci(
      () => get__userinfo__auth0(ctx))
  if (!response.ok) {
    error(`${logPrefix}|$userinfo__verify|!response.ok ${ctx.request.method} ${ctx.request.path}`)
    error(`${response.status} ${response.message || ''}`)
    throw__bad_credentials(ctx)
  }
  return await response.json()
}
function validate__user(user, ctx__request) {
  if (user.error) {
    error(`${logPrefix}|validate__user`)
    error(`${user.statusCode} ${user.error}`)
    error(user.message)
    error(JSON.stringify(ctx__request, null, 2))
  }
  if (!user.user_id) {
    throw__bad_gateway(ctx, {
      status__http: user.statusCode
    })
  }
}
