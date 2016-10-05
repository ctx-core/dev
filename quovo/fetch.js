import {assign,clone} from 'ctx-core/object/lib'
import env from 'ctx-core/quovo/env'
import {throw__missing_argument,throw__unauthorized} from 'ctx-core/error/lib'
import {
  $fetch,
  $fetch$ctx as $fetch$ctx__core,
  ensure__headers as ensure__headers__core} from 'ctx-core/fetch/lib'
import {
  assign__http$headers,
  contentType__json,
  assign__http$headers__contentType__json} from 'ctx-core/http/lib'
import {splice__selector__array} from 'ctx-core/array/lib'
import {yyyymmddhhmmss} from 'ctx-core/date/lib'
import btoa from 'btoa-lite'
import {log,debug} from 'ctx-core/logger/lib'
const quovo$fetch = $fetch({
        $fetch$ctx,
        ensure__headers
      })
    , url_base = env.QUOVO_API_URL
    , logPrefix = 'ctx-core/quovo/fetch'
export function *fetch$get__accounts(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__accounts`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__accounts) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: '/accounts'})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__accounts: json.accounts
  })
}
export function *fetch$get__user__accounts(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__user__accounts`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__user__accounts) return ctx
  yield fetch$post__token(ctx)
  let quovo__user_id = ctx.quovo__user_id
  if (!quovo__user_id) {
    throw__missing_argument(ctx, {key: 'ctx.quovo__user_id', type: 'fetch$get__user__accounts'}) }
  const response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: `/users/${quovo__user_id}/accounts`})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__user__accounts: json.accounts
  })
}
export function *fetch$post__user__accounts(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__user__accounts`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__account || ctx.quovo__account_id) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$post(
          ctx,
          request$ctx,
          {path: `/users/${ctx.quovo__user_id}/accounts`})
      , json = yield response$ctx.response.json()
      , quovo__account = json.account
  return assign(ctx, {
    quovo__account,
    quovo__account_id: quovo__account.id
  })
}
export function *fetch$delete__account(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$delete__account`)
  const request$ctx = clone(...request$ctx$$)
      , {quovo__account_id} = ctx
  if (!quovo__account_id) return ctx
  yield fetch$post__token(ctx)
  yield quovo$fetch.http$delete(
    ctx,
    request$ctx,
    {path: `/accounts/${request$ctx.quovo__account_id}`})
  ctx.quovo__account = null
  ctx.quovo__account_id = null
  if (ctx.quovo__accounts) {
    splice__selector__array(
      ctx.quovo__accounts,
      quovo__account =>
        quovo__account.id == quovo__account_id)
  }
  return ctx
}
export function *fetch$post__account__sync(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__account__sync`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.quovo__account_id) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$post(
          ctx,
          request$ctx,
          {path: `/accounts/${request$ctx.quovo__account_id}/sync`})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__account__sync: json.sync
  })
}
export function *fetch$get__account__sync(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__account__sync`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.quovo__account_id) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: `/accounts/${request$ctx.quovo__account_id}/sync`})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__account__sync: json.sync
  })
}
export function *fetch$get__accounts__challenges(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__accounts__challenges`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.quovo__account_id) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: `/accounts/${request$ctx.quovo__account_id}/challenges`})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__account__challenges: json.challenges
  })
}
export function *fetch$put__accounts__challenges(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$put__accounts__challenges`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.quovo__account_id) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$put(
          ctx,
          request$ctx,
          {path: `/accounts/${request$ctx.quovo__account_id}/challenges`})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__account__challenges: json.challenges
  })
}
export function *fetch$get__brokerages(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__brokerages`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__brokerages) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: '/brokerages'})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__brokerages: json.brokerages
  })
}
export function *fetch$post__user__iframe_token(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__user__iframe_token`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__iframe$token && ctx.quovo__iframe$url) return ctx
  const {quovo__user_id} = ctx
  if (!quovo__user_id) {throw__missing_argument(ctx, {key: 'ctx.quovo__user_id', type: 'fetch$post__user__iframe_token'}) }
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$post(
          ctx,
          request$ctx,
          {
            path: `/users/${quovo__user_id}/iframe_token`,
            body: '{}'})
      , json = yield response$ctx.response.json()
      , {iframe_token} = json
      , quovo__iframe$token = iframe_token.token
  return assign(ctx, {
    quovo__iframe$token,
    quovo__iframe$url: `https://www.quovo.com/index.php?action=remoteauth&u=${quovo__user_id}&k=${quovo__iframe$token}`
  })
}
export function *fetch$get__portfolios(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__portfolios`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__portfolios) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: '/portfolios'})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__portfolios: json.portfolios
  })
}
export function *fetch$get__accounts__portfolios(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__accounts__portfolios`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__account__portfolios) return ctx
  yield fetch$post__token(ctx)
  const {quovo__account_id} = ctx
      , response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {
            path: quovo__account_id
              ? `/accounts/${quovo__account_id}/portfolios`
              : '/portfolios'})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__account__portfolios: json.portfolios
  })
}
export function *fetch$get__portfolio__history(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__portfolio__history`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__portfolio__history) return ctx
  yield fetch$post__token(ctx)
  const quovo__portfolio_id = ctx.quovo__portfolio_id
      , response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: `/portfolios/${quovo__portfolio_id}/history`})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__portfolio__history: json.history
  })
}
export function *fetch$get__positions(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__positions`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__positions) return ctx
  yield fetch$post__token(ctx)
  const quovo__account_id = ctx.quovo__account_id
      , response$ctx = yield quovo$fetch.http$get(
            ctx,
            request$ctx,
            {
              path:
                quovo__account_id
                ? `/accounts/${quovo__account_id}/positions`
                : '/positions'
            })
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__positions: json.positions
  })
}
export function *fetch$get__users(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__users`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__users) return ctx
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: '/users'})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__users: json.users
  })
}
export function *fetch$get__user(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__user`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__user) return ctx
  yield fetch$post__token(ctx)
  const quovo__user_id = ctx.quovo__user_id
      , response$ctx = yield quovo$fetch.http$get(
          ctx,
          request$ctx,
          {path: `/users/${quovo__user_id}`})
      , json = yield response$ctx.response.json()
  return assign(ctx, {
    quovo__user: json.user
  })
}
export function *fetch$delete__user(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$delete__user`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.quovo__user_id) {
    throw__missing_argument(ctx, {
      key: 'ctx.quovo__user_id',
      type: 'fetch$delete__user'}) }
  yield fetch$post__token(ctx)
  yield quovo$fetch.http$delete(
    ctx,
    request$ctx,
    {path: `/users/${request$ctx.quovo__user_id}`})
  ctx.quovo__user_id = null
  return ctx
}
export function *fetch$post__users(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__users`)
  const request$ctx = clone(...request$ctx$$)
  yield fetch$post__token(ctx)
  const response$ctx = yield quovo$fetch.http$post(
          ctx,
          assign__http$headers__contentType__json(request$ctx),
          {path: '/users', body: ctx.body})
      , json = yield response$ctx.response.json()
      , quovo__user = json.user
      , quovo__user_id = quovo__user.id
  return assign(ctx, {
    quovo__access_token: response$ctx.quovo__access_token,
    quovo__user,
    quovo__user_id
  })
}
export function *fetch$post__token(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__token`)
  if (ctx.quovo__access_token && ctx.quovo__access_token__expires > new Date()) return ctx
  let request$ctx = clone(...request$ctx$$)
  assign__http$headers(
    request$ctx,
    contentType__json,
    {'Authorization': `Basic ${quovo__access__credentials(ctx)}`})
  const response$ctx = yield quovo$fetch.http$post(
          ctx,
          request$ctx,
          {
            path: '/tokens',
            body: JSON.stringify($body__fetch$post__token(request$ctx))})
      , json = yield response$ctx.response.json()
      , {access_token} = json
  if (json.status === 401) {
    throw__unauthorized(ctx, {error_message: JSON.stringify(json)})
  }
  return assign(ctx, {
    quovo__access_token: access_token.token,
    quovo__access_token__expires: new Date(access_token.expires)
  })
}
function $body__fetch$post__token() {
  return {
    name: `${env.QUOVO_ACCESS_TOKEN_KEY_PREFIX}-${yyyymmddhhmmss()}-${Math.random()}`
  }
}
function quovo__access__credentials(ctx) {
  const QUOVO_LOGIN =
          env.QUOVO_LOGIN
          || (env && env.QUOVO_LOGIN)
          || throw__missing_argument(ctx, {key: 'env.QUOVO_LOGIN', type: 'quovo__access__credentials'})
      , QUOVO_PASSWORD =
          env.QUOVO_PASSWORD
          || (env && env.QUOVO_PASSWORD)
          || throw__missing_argument(ctx, {key: 'env.QUOVO_PASSWORD', type: 'quovo__access__credentials'})
  return btoa(`${QUOVO_LOGIN}:${QUOVO_PASSWORD}`)
}
function $fetch$ctx(ctx, ...fetch$ctx$$) {
  log(`${logPrefix}|$fetch$ctx`)
  let fetch$ctx = $fetch$ctx__core(ctx, {url_base}, ...fetch$ctx$$)
  if (['POST', 'PUT'].indexOf(fetch$ctx.method) > -1) {
    assign__http$headers__contentType__json(fetch$ctx, ...ctx.headers)
  }
  return fetch$ctx
}
function ensure__headers(fetch$ctx, ctx) {
  log(`${logPrefix}|ensure__headers`)
  ensure__headers__core(fetch$ctx, ctx)
  const {quovo__access_token} = ctx
  if (quovo__access_token) {
    assign__http$headers(fetch$ctx, {'Authorization': `Bearer ${quovo__access_token}`})
  }
  return ctx
}