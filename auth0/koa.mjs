import {assign__ctx__env} from 'ctx-core/env'
import {assign} from 'ctx-core/object/lib'
import route__koa from 'koa-route'
import {$html__script__auth} from 'ctx-core/auth0/html'
import {throw__bad_credentials
      , throw__bad_gateway} from 'ctx-core/error/lib'
import {get__userinfo__auth0
      , patch__user__v2__auth0} from 'ctx-core/auth0/fetch'
import {$token__auth0
      , $credentials__client_credentials} from 'ctx-core/auth0/management'
import {sleep} from 'ctx-core/sleep/lib'
import {fibonacci} from 'ctx-core/fibonacci/lib'
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
      , user_id = await $user_id__verify(ctx)
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
export async function $user_id__verify(ctx) {
  const userinfo = await $userinfo__verify(ctx)
      , user_id =
          userinfo
          && (userinfo.user_id
              || userinfo.sub)
  return user_id
}
export async function $email__verify(ctx) {
  const userinfo = await $userinfo__verify(ctx)
      , {email} = userinfo
  return email
}
export async function $userinfo__verify(ctx) {
  const response = await get__userinfo__auth0(ctx)
  if (!response.ok) {
    error(`${logPrefix}|$userinfo__verify|!response.ok ${ctx.request.method} ${ctx.request.path}`)
    error(`${response.status} ${response.message || ''}`)
    if (response.status == 429) {
      const remaining__ratelimit =
              $remaining__ratelimit(response)
      return $userinfo__waitfor__ratelimit(remaining__ratelimit)
    }
    throw__bad_credentials(ctx)
  }
  return await response.json()
  async function $userinfo__waitfor__ratelimit(delay) {
    let response
      , done = false
      , n__delay = 1
    while (!done) {
      await sleep(delay)
      response = await get__userinfo__auth0(ctx)
      if (response.ok) {
        return response.json()
      }
      if (response.status === 429) {
        const delay__ =
                fibonacci(n__delay) * 500
        delay = $remaining__ratelimit(response) + delay__
        n__delay++
        continue
      }
      done = true
    }
  }
  function $remaining__ratelimit(response) {
    return (
      parseInt(
        response.headers.get('x-ratelimit-remaining'))
      || 1000
    )
  }
}