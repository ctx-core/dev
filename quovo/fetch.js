import {assign,clone} from "ctx-core/object/lib";
import env from "ctx-core/env";
import {throw__error} from "ctx-core/error/lib";
import {new__fetch} from "ctx-core/fetch/lib";
import {
  assign__http$headers,
  contentType__json,
  assign__http$headers__contentType__json} from "ctx-core/http/lib";
import {array$splice__selector} from "ctx-core/array/lib";
import {yyyymmddhhmmss} from "ctx-core/date/lib"
import btoa from "btoa-lite";
import {log,debug} from "ctx-core/logger/lib";
const quovo$fetch = new__fetch()
    , new__fetch$ctx__core = quovo$fetch.new__fetch$ctx
    , assign__headers__core = quovo$fetch.assign__headers
    , url$base = "https://api.quovo.com/v2"
    , logPrefix = "ctx-core/quovo/fetch";
assign(quovo$fetch, {
  new__fetch$ctx: new__fetch$ctx,
  assign__headers: assign__headers
});
export function *http$get__accounts(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__accounts`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__accounts) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: "/accounts"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__accounts: (yield response$ctx.response.json()).accounts
  });
}
export function *http$get__user__accounts(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__user__accounts`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__user__accounts) return ctx;
  yield new__quovo$access_token(ctx);
  let quovo__user_id = ctx.quovo__user_id;
  if (!quovo__user_id) throw__error__ctx$keys$missing(ctx, {ctx$keys$missing: ["quovo__user_id"] });
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/users/${quovo__user_id}/accounts`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__user__accounts: (yield response$ctx.response.json()).accounts
  });
}
export function *http$post__user__accounts(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__user__accounts`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__account || ctx.quovo__account_id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(request$ctx, {
          path: `/users/${ctx.quovo__user_id}/accounts`})
      , quovo__account = (yield response$ctx.response.json()).account;
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__account: quovo__account,
    quovo__account_id: quovo__account.id
  });
}
export function *http$delete__account(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$delete__account`);
  const ctx$rest = clone(...ctx$rest$$)
      , quovo__account_id = ctx.quovo__account_id;
  if (!quovo__account_id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest);
  yield quovo$fetch.http$delete(request$ctx, {path: `/accounts/${request$ctx.quovo__account_id}`});
  delete ctx.quovo__account;
  delete ctx.quovo__account_id;
  if (ctx.quovo__accounts) {
    array$splice__selector(ctx.quovo__accounts, quovo__account => quovo__account.id == quovo__account_id);
  }
  return ctx;
}
export function *http$post__account__sync(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__account__sync`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo__account_id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(request$ctx, {
          path: `/accounts/${request$ctx.quovo__account_id}/sync`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__account__sync: (yield response$ctx.response.json()).sync
  });
}
export function *http$get__account__sync(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__account__sync`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo__account_id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/accounts/${request$ctx.quovo__account_id}/sync`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__account__sync: (yield response$ctx.response.json()).sync
  });
}
export function *http$get__accounts__challenges(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__accounts__challenges`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo__account_id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/accounts/${request$ctx.quovo__account_id}/challenges`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__account__challenges: (yield response$ctx.response.json()).challenges
  });
}
export function *http$put__accounts__challenges(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$put__accounts__challenges`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo__account_id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$put(request$ctx, {
          path: `/accounts/${request$ctx.quovo__account_id}/challenges`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__account__challenges: (yield response$ctx.response.json()).challenges
  });
}
export function *http$get__brokerages(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__brokerages`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__brokerages) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: "/brokerages"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__brokerages: (yield response$ctx.response.json()).brokerages
  });
}
export function *http$post__user__iframe_token(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__user__iframe_token`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__iframe$token && ctx.quovo__iframe$url) return ctx;
  const quovo__user_id = ctx.quovo__user_id;
  if (!quovo__user_id) throw__error__ctx$keys$missing(ctx, {
    ctx$keys$missing: ["quovo__user_id"] });
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(request$ctx, {
          path: `/users/${quovo__user_id}/iframe_token`,
          body: "{}"})
      , json = yield response$ctx.response.json()
      , iframe_token = json.iframe_token
      , quovo__iframe$token = iframe_token.token;
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__iframe$token: quovo__iframe$token,
    quovo__iframe$url: `https://www.quovo.com/index.php?action=remoteauth&u=${quovo__user_id}&k=${quovo__iframe$token}`
  });
}
export function *http$get__portfolios(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__portfolios`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__portfolios) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: "/portfolios"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__portfolios: (yield response$ctx.response.json()).portfolios
  });
}
export function *http$get__accounts__portfolios(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__accounts__portfolios`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__account__portfolios) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo__account_id = ctx.quovo__account_id;
  if (!quovo__account_id) throw__error__ctx$keys$missing(ctx, {ctx$keys$missing: ["quovo__account_id"] });
  const response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: `/accounts/${quovo__account_id}/portfolios`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__account__portfolios: (yield response$ctx.response.json()).portfolios
  });
}
export function *http$get__accounts__portfolios(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__accounts__portfolios`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__account__portfolios) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo__account_id = ctx.quovo__account_id
      , response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: quovo__account_id ?
                `/accounts/${quovo__account_id}/portfolios` :
                "/portfolios"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__account__portfolios: (yield response$ctx.response.json()).portfolios
  });
}
export function *http$get__portfolio__history(ctx, ...ctx$rest$$) {
  const ctx$rest = clone(...ctx$rest$$);
  log(`${logPrefix}|http$get__portfolio__history`);
  if (ctx.quovo__portfolio__history) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo__portfolio_id = ctx.quovo__portfolio_id
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/portfolios/${quovo__portfolio_id}/history`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__portfolio__history: (yield response$ctx.response.json()).history
  });
}
export function *http$get__positions(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__positions`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__positions) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo__account_id = ctx.quovo__account_id
      , response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: quovo__account_id ?
                `/accounts/${quovo__account_id}/positions` :
                "/positions"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__positions: (yield response$ctx.response.json()).positions
  });
}
export function *new__quovo$access_token(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|new__quovo$access_token`);
  if (ctx.quovo$access_token && ctx.agent__quovo$access_token$expires > new Date()) return ctx;
  let request$ctx = clone(ctx, ...ctx$rest$$);
  assign__http$headers(request$ctx, contentType__json, {
    "Authorization": `Basic ${quovo$access$credentials(ctx)}`});
  const response$ctx = yield quovo$fetch.http$post(request$ctx, {
          path: "/tokens",
          body: JSON.stringify(new__quovo$access_token$body(request$ctx))})
      , response$json = yield response$ctx.response.json()
      , access_token = response$json.access_token;
  return assign(ctx, {
    quovo$access_token: access_token.token,
    agent__quovo$access_token$expires: new Date(access_token.expires)
  });
}
function new__quovo$access_token$body() {
  return {
    name: `${env.QUOVO_ACCESS_TOKEN_KEY_PREFIX}-${yyyymmddhhmmss()}-${Math.random()}`
  };
}
function quovo$access$credentials(ctx) {
  const QUOVO_LOGIN = env.QUOVO_LOGIN || (env && env.QUOVO_LOGIN) || throw__error(ctx, {error_message: "env.QUOVO_LOGIN missing"})
      , QUOVO_PASSWORD = env.QUOVO_PASSWORD || (env && env.QUOVO_PASSWORD) || throw__error(ctx, {error_message: "env.QUOVO_PASSWORD missing"});
  return btoa(`${QUOVO_LOGIN}:${QUOVO_PASSWORD}`);
}
export function *http$get__users(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__users`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__users) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {path: "/users"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__users: (yield response$ctx.response.json()).users
  });
}
export function *http$get__user(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__user`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo__user) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo__user_id = ctx.quovo__user_id
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {path: `/users/${quovo__user_id}`})
      , quovo__user = (yield response$ctx.response.json()).user
      ;
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo__user: quovo__user
  });
}
export function *http$delete__user(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$delete__user`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo__user_id) throw__error(ctx, {error_message: "ctx.quovo__user_id not defined"});
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest);
  yield quovo$fetch.http$delete(request$ctx, {path: `/users/${request$ctx.quovo__user_id}`});
  delete ctx.quovo__user_id;
  return ctx;
}
export function *http$post__users(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__users`);
  const ctx$rest = clone(...ctx$rest$$);
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(
          assign__http$headers__contentType__json(request$ctx),
          {path: "/users", body: ctx.body})
      , quovo__user = (yield response$ctx.response.json()).user
      , quovo__user_id = quovo__user.id;
  return assign(ctx, {
    quovo$access_token: response$ctx.quovo$access_token,
    quovo__user: quovo__user,
    quovo__user_id: quovo__user_id
  });
}
function throw__error__ctx$keys$missing(ctx, error$, ...error$rest$$) {
  log(`${logPrefix}|throw__error__ctx$keys$missing`);
  let error$ctx = (ctx && ctx.error$ctx) || {};
  assign(error$ctx, error$, ...error$rest$$);
  let error_message =
    ctx.error_message ||
    (error$ctx && error$ctx.error_message) ||
    `Missing keys: ${JSON.stringify(error$.ctx$keys$missing)}`;
  assign(error$ctx, {
    error_message: error_message,
    http$status: 400,
    http$error_message: "Invalid request"
  });
  assign(ctx, {error$ctx: error$ctx});
  throw__error(ctx);
}
function new__fetch$ctx(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|new__fetch$ctx`);
  let ctx$clone = new__fetch$ctx__core(ctx, {url$base: url$base}, ...ctx$rest$$);
  if (["POST", "PUT"].indexOf(ctx$clone.method) > -1) {
    assign__http$headers__contentType__json(ctx$clone);
  }
  return ctx$clone;
}
function assign__headers(ctx, ...header$$) {
  log(`${logPrefix}|assign__headers`);
  assign__headers__core(ctx, ...header$$);
  const quovo$access_token = ctx.quovo$access_token;
  if (quovo$access_token) {
    ctx.headers["Authorization"] = `Bearer ${quovo$access_token}`;
  }
  return ctx;
}