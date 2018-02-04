import {assign,clone} from 'ctx-core/object/lib'
import env from 'ctx-core/quovo/env'
import {throw__missing_argument,throw__unauthorized} from 'ctx-core/error/lib'
import {
  $fetch,
  $ctx__fetch as $ctx__fetch__core,
  ensure__headers as ensure__headers__core} from 'ctx-core/fetch/lib'
import {assign__headers__http,$ContentType__json} from 'ctx-core/http/lib'
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
export async function fetch__get__accounts(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__accounts`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.accounts__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/accounts`})
      , __json = await response.json()
  return assign(ctx, {
    accounts__quovo: __json.accounts
  })
}
export async function fetch__get__user__accounts(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__user__accounts`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.account__user__quovos) return ctx
  await fetch__post__token(ctx)
  let user_id__quovo = ctx.user_id__quovo
  if (!user_id__quovo) {
    throw__missing_argument(
      ctx,
      { key: 'ctx.user_id__quovo',
        type: 'fetch__get__user__accounts'})
  }
  const response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/users/${user_id__quovo}/accounts`})
      , __json = await response.json()
  return assign(ctx, {
    account__user__quovos: __json.accounts
  })
}
export async function fetch__post__user__accounts(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__post__user__accounts`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.quovo__account || ctx.account_id__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.post__http(
            ctx,
            ctx__request,
            {url: `${url_base}/users/${ctx.user_id__quovo}/accounts`})
      , __json = await response.json()
      , quovo__account = __json.account
  return assign(ctx, {
    quovo__account,
    account_id__quovo: quovo__account.id
  })
}
export async function fetch__delete__account(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__delete__account`)
  const ctx__request = clone(...array__ctx__request)
      , {account_id__quovo} = ctx
  if (!account_id__quovo) return ctx
  await fetch__post__token(ctx)
  await fetch__quovo.delete__http(
    ctx,
    ctx__request,
    {url: `${url_base}/accounts/${ctx__request.account_id__quovo}`})
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
export async function fetch__post__account__sync(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__post__account__sync`)
  const ctx__request = clone(...array__ctx__request)
  if (!ctx.account_id__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.post__http(
            ctx,
            ctx__request,
            {url: `${url_base}/accounts/${ctx__request.account_id__quovo}/sync`})
      , __json = await response.json()
  return assign(ctx, {
    quovo__account__sync: __json.sync
  })
}
export async function fetch__get__account__sync(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__account__sync`)
  const ctx__request = clone(...array__ctx__request)
  if (!ctx.account_id__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/accounts/${ctx__request.account_id__quovo}/sync`})
      , __json = await response.json()
  return assign(ctx, {
    quovo__account__sync: __json.sync
  })
}
export async function fetch__get__accounts__challenges(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__accounts__challenges`)
  const ctx__request = clone(...array__ctx__request)
  if (!ctx.account_id__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/accounts/${ctx__request.account_id__quovo}/challenges`})
      , __json = await response.json()
  return assign(ctx, {
    quovo__account__challenges: __json.challenges
  })
}
export async function fetch__put__accounts__challenges(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__put__accounts__challenges`)
  const ctx__request = clone(...array__ctx__request)
  if (!ctx.account_id__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.put__http(
            ctx,
            ctx__request,
            {url: `${url_base}/accounts/${ctx__request.account_id__quovo}/challenges`})
      , __json = await response.json()
  return assign(ctx, {
    quovo__account__challenges: __json.challenges
  })
}
export async function fetch__get__brokerages(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__brokerages`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.brokerages__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/brokerages`})
      , __json = await response.json()
  return assign(ctx, {
    brokerages__quovo: __json.brokerages
  })
}
export async function fetch__post__user__iframe_token(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__post__user__iframe_token`)
  const ctx__request =
    clone(...array__ctx__request)
  if (ctx.token__iframe__quovo && ctx.url__iframe__quovo)
      return ctx
  const {user_id__quovo} = ctx
  if (!user_id__quovo) {
    throw__missing_argument(
      ctx,
      { key: 'ctx.user_id__quovo',
        type: 'fetch__post__user__iframe_token'})
  }
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.post__http(
            ctx,
            ctx__request,
            { url: `${url_base}/users/${user_id__quovo}/iframe_token`,
              body: '{}'})
      , __json = await response.json()
      , {iframe_token} = __json
      , token__iframe__quovo = iframe_token.token
  return assign(ctx, {
    token__iframe__quovo,
    url__iframe__quovo: `https://www.quovo.com/index.php?action=remoteauth&u=${user_id__quovo}&k=${token__iframe__quovo}`
  })
}
export async function fetch__get__portfolios(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__portfolios`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.portfolios__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/portfolios`})
      , __json = await response.json()
  return assign(ctx, {
    portfolios__quovo: __json.portfolios
  })
}
export async function fetch__get__accounts__portfolios(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__accounts__portfolios`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.quovo__account__portfolios) return ctx
  await fetch__post__token(ctx)
  const {account_id__quovo} = ctx
      , response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            { url: account_id__quovo
              ? `${url_base}/accounts/${account_id__quovo}/portfolios`
              : `${url_base}/portfolios`})
      , __json = await response.json()
  return assign(ctx, {
    quovo__account__portfolios: __json.portfolios
  })
}
export async function fetch__get__portfolio__history(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__portfolio__history`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.portfolio_history__quovo) return ctx
  await fetch__post__token(ctx)
  const portfolio_id__quovo = ctx.portfolio_id__quovo
      , response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/portfolios/${portfolio_id__quovo}/history`})
      , __json = await response.json()
  return assign(ctx, {
    portfolio_history__quovo: __json.history
  })
}
export async function fetch__get__positions(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__positions`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.positions__quovo) return ctx
  await fetch__post__token(ctx)
  const account_id__quovo = ctx.account_id__quovo
      , response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            { path:
                account_id__quovo
                ? `${url_base}/accounts/${account_id__quovo}/positions`
                : `${url_base}/positions`
            })
      , __json = await response.json()
  return assign(ctx, {
    positions__quovo: __json.positions
  })
}
export async function fetch__get__users(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__users`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.users__quovo) return ctx
  await fetch__post__token(ctx)
  const response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/users`})
      , __json = await response.json()
  return assign(ctx, {
    users__quovo: __json.users
  })
}
export async function fetch__get__user(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__get__user`)
  const ctx__request = clone(...array__ctx__request)
  if (ctx.user__quovo) return ctx
  await fetch__post__token(ctx)
  const user_id__quovo = ctx.user_id__quovo
      , response =
          await fetch__quovo.get__http(
            ctx,
            ctx__request,
            {url: `${url_base}/users/${user_id__quovo}`})
      , __json = await response.json()
  return assign(ctx, {
    user__quovo: __json.user
  })
}
export async function fetch__delete__user(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__delete__user`)
  const ctx__request =
          clone(...array__ctx__request)
  if (!ctx.user_id__quovo) {
    throw__missing_argument(
      ctx,
      { key: 'ctx.user_id__quovo',
        type: 'fetch__delete__user'})
  }
  await fetch__post__token(ctx)
  await fetch__quovo.delete__http(
    ctx,
    ctx__request,
    {url: `${url_base}/users/${ctx__request.user_id__quovo}`})
  ctx.user_id__quovo = null
  return ctx
}
export async function fetch__post__users(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__post__users`)
  const ctx__request =
          clone(...array__ctx__request)
  await fetch__post__token(ctx)
  assign__headers__http(
    ctx__request,
    $ContentType__json())
  const response =
          await fetch__quovo.post__http(
            ctx,
            ctx__request,
            {url: `${url_base}/users`, body: ctx.body})
      , __json = await response.json()
      , user__quovo = __json.user
      , user_id__quovo = user__quovo.id
  return assign(ctx, {
    access_token__quovo: response.access_token__quovo,
    user__quovo,
    user_id__quovo
  })
}
export async function fetch__post__token(
  ctx,
  ...array__ctx__request
) {
  log(`${logPrefix}|fetch__post__token`)
  if (
    ctx.access_token__quovo
    && ctx.expires__access_token__quovo > new Date()
  ) return ctx
  let ctx__request =
        clone(...array__ctx__request)
  assign__headers__http(
    ctx__request,
    $ContentType__json({
      'Authorization': `Basic ${access__credentials__quovo(ctx)}`
    }))
  const response =
          await fetch__quovo.post__http(
            ctx,
            ctx__request,
            { url: `${url_base}/tokens`,
              body:
                JSON.stringify(
                  $body__fetch__post__token(ctx__request))})
      , __json = await response.json()
      , {access_token} = __json
  if (__json.status === 401) {
    throw__unauthorized(
      ctx,
      {error_message: JSON.stringify(__json)})
  }
  return assign(ctx, {
    access_token__quovo:
      access_token.token,
    expires__access_token__quovo:
      new Date(access_token.expires)
  })
}
function $body__fetch__post__token() {
  return {
    name: `${env.QUOVO_ACCESS_TOKEN_KEY_PREFIX}-${yyyymmddhhmmss()}-${Math.random()}`
  }
}
function access__credentials__quovo(ctx) {
  const QUOVO_LOGIN =
          env.QUOVO_LOGIN
          || (env && env.QUOVO_LOGIN)
          ||  throw__missing_argument(
                ctx,
                { key: 'env.QUOVO_LOGIN',
                  type: 'access__credentials__quovo'})
      , QUOVO_PASSWORD =
          env.QUOVO_PASSWORD
          || (env && env.QUOVO_PASSWORD)
          ||  throw__missing_argument(
                ctx,
                { key: 'env.QUOVO_PASSWORD',
                  type: 'access__credentials__quovo'})
  return btoa(`${QUOVO_LOGIN}:${QUOVO_PASSWORD}`)
}
function $ctx__fetch(ctx, ...ctx__fetch$$) {
  log(`${logPrefix}|$ctx__fetch`)
  let ctx__fetch =
        $ctx__fetch__core(
          ctx,
          {url_base},
          ...ctx__fetch$$)
  if (
    ['POST', 'PUT'].indexOf(ctx__fetch.method) > -1
  ) {
    assign__headers__http(
      ctx__fetch,
      $ContentType__json(),
      ...ctx.headers)
  }
  return ctx__fetch
}
function ensure__headers(ctx__fetch, ctx) {
  log(`${logPrefix}|ensure__headers`)
  ensure__headers__core(ctx__fetch, ctx)
  const {access_token__quovo} = ctx
  if (access_token__quovo) {
    assign__headers__http(
      ctx__fetch,
      { 'Authorization':
          `Bearer ${access_token__quovo}`})
  }
  return ctx
}