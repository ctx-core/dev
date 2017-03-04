import {assign,clone} from 'ctx-core/object/lib'
import env from 'ctx-core/quovo/env'
import {throw__missing_argument,throw__unauthorized} from 'ctx-core/error/lib'
import {
  $fetch,
  $ctx__fetch as $ctx__fetch__core,
  ensure__headers as ensure__headers__core} from 'ctx-core/fetch/lib'
import {assign__http$headers,$ContentType__json} from 'ctx-core/http/lib'
import {splice__selector__array} from 'ctx-core/array/lib'
import {yyyymmddhhmmss} from 'ctx-core/date/lib'
import btoa from 'btoa-lite'
import {log,debug} from 'ctx-core/logger/lib'
const fetch__quovo = $fetch({
        $ctx__fetch,
        ensure__headers
      })
    , url_base = env.QUOVO_API_URL
    , logPrefix = 'ctx-core/quovo/fetch'
export async function fetch$get__accounts(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__accounts`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.accounts__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/accounts`})
  const json = await response.json()
  return assign(ctx, {
    accounts__quovo: json.accounts
  })
}
export async function fetch$get__user__accounts(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__user__accounts`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.account__user__quovos) return ctx
  await fetch$post__token(ctx)
  let user_id__quovo = ctx.user_id__quovo
  if (!user_id__quovo) {
    throw__missing_argument(ctx, {key: 'ctx.user_id__quovo', type: 'fetch$get__user__accounts'}) }
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/users/${user_id__quovo}/accounts`})
  const json = await response.json()
  return assign(ctx, {
    account__user__quovos: json.accounts
  })
}
export async function fetch$post__user__accounts(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__user__accounts`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__account || ctx.account_id__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$post(
          ctx,
          request$ctx,
          {url: `${url_base}/users/${ctx.user_id__quovo}/accounts`})
  const json = await response.json()
      , quovo__account = json.account
  return assign(ctx, {
    quovo__account,
    account_id__quovo: quovo__account.id
  })
}
export async function fetch$delete__account(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$delete__account`)
  const request$ctx = clone(...request$ctx$$)
      , {account_id__quovo} = ctx
  if (!account_id__quovo) return ctx
  await fetch$post__token(ctx)
  await fetch__quovo.http$delete(
    ctx,
    request$ctx,
    {url: `${url_base}/accounts/${request$ctx.account_id__quovo}`})
  ctx.quovo__account = null
  ctx.account_id__quovo = null
  if (ctx.accounts__quovo) {
    splice__selector__array(
      ctx.accounts__quovo,
      quovo__account =>
        quovo__account.id == account_id__quovo)
  }
  return ctx
}
export async function fetch$post__account__sync(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__account__sync`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.account_id__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$post(
          ctx,
          request$ctx,
          {url: `${url_base}/accounts/${request$ctx.account_id__quovo}/sync`})
  const json = await response.json()
  return assign(ctx, {
    quovo__account__sync: json.sync
  })
}
export async function fetch$get__account__sync(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__account__sync`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.account_id__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/accounts/${request$ctx.account_id__quovo}/sync`})
  const json = await response.json()
  return assign(ctx, {
    quovo__account__sync: json.sync
  })
}
export async function fetch$get__accounts__challenges(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__accounts__challenges`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.account_id__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/accounts/${request$ctx.account_id__quovo}/challenges`})
  const json = await response.json()
  return assign(ctx, {
    quovo__account__challenges: json.challenges
  })
}
export async function fetch$put__accounts__challenges(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$put__accounts__challenges`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.account_id__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$put(
          ctx,
          request$ctx,
          {url: `${url_base}/accounts/${request$ctx.account_id__quovo}/challenges`})
  const json = await response.json()
  return assign(ctx, {
    quovo__account__challenges: json.challenges
  })
}
export async function fetch$get__brokerages(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__brokerages`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.brokerages__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/brokerages`})
  const json = await response.json()
  return assign(ctx, {
    brokerages__quovo: json.brokerages
  })
}
export async function fetch$post__user__iframe_token(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__user__iframe_token`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__iframe$token && ctx.quovo__iframe$url) return ctx
  const {user_id__quovo} = ctx
  if (!user_id__quovo) {throw__missing_argument(ctx, {key: 'ctx.user_id__quovo', type: 'fetch$post__user__iframe_token'}) }
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$post(
          ctx,
          request$ctx,
          {
            url: `${url_base}/users/${user_id__quovo}/iframe_token`,
            body: '{}'})
  const json = await response.json()
      , {iframe_token} = json
      , quovo__iframe$token = iframe_token.token
  return assign(ctx, {
    quovo__iframe$token,
    quovo__iframe$url: `https://www.quovo.com/index.php?action=remoteauth&u=${user_id__quovo}&k=${quovo__iframe$token}`
  })
}
export async function fetch$get__portfolios(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__portfolios`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.portfolios__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/portfolios`})
  const json = await response.json()
  return assign(ctx, {
    portfolios__quovo: json.portfolios
  })
}
export async function fetch$get__accounts__portfolios(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__accounts__portfolios`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.quovo__account__portfolios) return ctx
  await fetch$post__token(ctx)
  const {account_id__quovo} = ctx
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {
            url: account_id__quovo
              ? `${url_base}/accounts/${account_id__quovo}/portfolios`
              : `${url_base}/portfolios`})
  const json = await response.json()
  return assign(ctx, {
    quovo__account__portfolios: json.portfolios
  })
}
export async function fetch$get__portfolio__history(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__portfolio__history`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.portfolio_history__quovo) return ctx
  await fetch$post__token(ctx)
  const portfolio_id__quovo = ctx.portfolio_id__quovo
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/portfolios/${portfolio_id__quovo}/history`})
  const json = await response.json()
  return assign(ctx, {
    portfolio_history__quovo: json.history
  })
}
export async function fetch$get__positions(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__positions`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.positions__quovo) return ctx
  await fetch$post__token(ctx)
  const account_id__quovo = ctx.account_id__quovo
  const response = await fetch__quovo.http$get(
            ctx,
            request$ctx,
            {
              path:
                account_id__quovo
                ? `${url_base}/accounts/${account_id__quovo}/positions`
                : `${url_base}/positions`
            })
  const json = await response.json()
  return assign(ctx, {
    positions__quovo: json.positions
  })
}
export async function fetch$get__users(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__users`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.users__quovo) return ctx
  await fetch$post__token(ctx)
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/users`})
  const json = await response.json()
  return assign(ctx, {
    users__quovo: json.users
  })
}
export async function fetch$get__user(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$get__user`)
  const request$ctx = clone(...request$ctx$$)
  if (ctx.user__quovo) return ctx
  await fetch$post__token(ctx)
  const user_id__quovo = ctx.user_id__quovo
  const response = await fetch__quovo.http$get(
          ctx,
          request$ctx,
          {url: `${url_base}/users/${user_id__quovo}`})
  const json = await response.json()
  return assign(ctx, {
    user__quovo: json.user
  })
}
export async function fetch$delete__user(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$delete__user`)
  const request$ctx = clone(...request$ctx$$)
  if (!ctx.user_id__quovo) {
    throw__missing_argument(ctx, {
      key: 'ctx.user_id__quovo',
      type: 'fetch$delete__user'}) }
  await fetch$post__token(ctx)
  await fetch__quovo.http$delete(
    ctx,
    request$ctx,
    {url: `${url_base}/users/${request$ctx.user_id__quovo}`})
  ctx.user_id__quovo = null
  return ctx
}
export async function fetch$post__users(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__users`)
  const request$ctx = clone(...request$ctx$$)
  await fetch$post__token(ctx)
  assign__http$headers(request$ctx, $ContentType__json())
  const response = await fetch__quovo.http$post(
          ctx,
          request$ctx,
          {url: `${url_base}/users`, body: ctx.body})
  const json = await response.json()
      , user__quovo = json.user
      , user_id__quovo = user__quovo.id
  return assign(ctx, {
    quovo__access_token: response.quovo__access_token,
    user__quovo,
    user_id__quovo
  })
}
export async function fetch$post__token(ctx, ...request$ctx$$) {
  log(`${logPrefix}|fetch$post__token`)
  if (ctx.quovo__access_token && ctx.quovo__access_token__expires > new Date()) return ctx
  let request$ctx = clone(...request$ctx$$)
  assign__http$headers(
    request$ctx,
    $ContentType__json({
      'Authorization': `Basic ${quovo__access__credentials(ctx)}`
    }))
  const response =
          await fetch__quovo.http$post(
            ctx,
            request$ctx,
            {
              url: `${url_base}/tokens`,
              body: JSON.stringify($body__fetch$post__token(request$ctx))})
  const json = await response.json()
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
function $ctx__fetch(ctx, ...ctx__fetch$$) {
  log(`${logPrefix}|$ctx__fetch`)
  let ctx__fetch = $ctx__fetch__core(ctx, {url_base}, ...ctx__fetch$$)
  if (['POST', 'PUT'].indexOf(ctx__fetch.method) > -1) {
    assign__http$headers(ctx__fetch, $ContentType__json(), ...ctx.headers)
  }
  return ctx__fetch
}
function ensure__headers(ctx__fetch, ctx) {
  log(`${logPrefix}|ensure__headers`)
  ensure__headers__core(ctx__fetch, ctx)
  const {quovo__access_token} = ctx
  if (quovo__access_token) {
    assign__http$headers(ctx__fetch, {'Authorization': `Bearer ${quovo__access_token}`})
  }
  return ctx
}