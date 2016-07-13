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
    , fetch$lib__fetch$ctx = quovo$fetch.fetch$ctx
    , assign__fetch$lib__ctx$request$headers = quovo$fetch.assign__ctx$request$headers
    , url$base = "https://api.quovo.com/v2"
    , logPrefix = "ctx-core/quovo/fetch";
assign(quovo$fetch, {
  fetch$ctx: fetch$ctx,
  assign__ctx$request$headers: assign__ctx$request$headers
});
export function *http$get__account$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__account$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$account$$) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: "/accounts"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account$$: (yield response$ctx.response.json()).accounts
  });
}
export function *http$get__user$account$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__user$account$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$user$account$$) return ctx;
  yield new__quovo$access_token(ctx);
  let quovo$user$id = ctx.quovo$user$id;
  if (!quovo$user$id) throw__error__ctx$keys$missing(ctx, {ctx$keys$missing: ["quovo$user$id"] });
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/users/${quovo$user$id}/accounts`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$user$account$$: (yield response$ctx.response.json()).accounts
  });
}
export function *http$post__user$account$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__user$account$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$account || ctx.quovo$account$id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(request$ctx, {
          path: `/users/${ctx.quovo$user$id}/accounts`})
      , quovo$account = (yield response$ctx.response.json()).account;
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account: quovo$account,
    quovo$account$id: quovo$account.id
  });
}
export function *http$delete__account(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$delete__account`);
  const ctx$rest = clone(...ctx$rest$$)
      , quovo$account$id = ctx.quovo$account$id;
  if (!quovo$account$id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest);
  yield quovo$fetch.http$delete(request$ctx, {path: `/accounts/${request$ctx.quovo$account$id}`});
  delete ctx.quovo$account;
  delete ctx.quovo$account$id;
  if (ctx.quovo$account$$) {
    array$splice__selector(ctx.quovo$account$$, quovo$account => quovo$account.id == quovo$account$id);
  }
  return ctx;
}
export function *http$post__account$sync(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__account$sync`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo$account$id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(request$ctx, {
          path: `/accounts/${request$ctx.quovo$account$id}/sync`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account$sync: (yield response$ctx.response.json()).sync
  });
}
export function *http$get__account$sync(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__account$sync`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo$account$id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/accounts/${request$ctx.quovo$account$id}/sync`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account$sync: (yield response$ctx.response.json()).sync
  });
}
export function *http$get__account$$challenge$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__account$$challenge$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo$account$id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/accounts/${request$ctx.quovo$account$id}/challenges`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account$challenge$$: (yield response$ctx.response.json()).challenges
  });
}
export function *http$put__account$$challenge$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$put__account$$challenge$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo$account$id) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$put(request$ctx, {
          path: `/accounts/${request$ctx.quovo$account$id}/challenges`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account$challenge$$: (yield response$ctx.response.json()).challenges
  });
}
export function *http$get__brokerage$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__brokerage$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$brokerage$$) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: "/brokerages"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$brokerage$$: (yield response$ctx.response.json()).brokerages
  });
}
export function *http$post__user$iframe_token(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__user$iframe_token`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$iframe$token && ctx.quovo$iframe$url) return ctx;
  const quovo$user$id = ctx.quovo$user$id;
  if (!quovo$user$id) throw__error__ctx$keys$missing(ctx, {
    ctx$keys$missing: ["quovo$user$id"] });
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(request$ctx, {
          path: `/users/${quovo$user$id}/iframe_token`,
          body: "{}"})
      , quovo$iframe$token = (yield response$ctx.response.json()).iframe_token.token;
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$iframe$token: quovo$iframe$token,
    quovo$iframe$url: `https://www.quovo.com/index.php?action=remoteauth&u=${quovo$user$id}&k=${quovo$iframe$token}`
  });
}
export function *http$get__portfolio$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__portfolio$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$portfolio$$) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: "/portfolios"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$portfolio$$: (yield response$ctx.response.json()).portfolios
  });
}
export function *http$get__account$portfolio$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__account$portfolio$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$account$portfolio$$) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo$account$id = ctx.quovo$account$id;
  if (!quovo$account$id) throw__error__ctx$keys$missing(ctx, {ctx$keys$missing: ["quovo$account$id"] });
  const response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: `/accounts/${quovo$account$id}/portfolios`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account$portfolio$$: (yield response$ctx.response.json()).portfolios
  });
}
export function *http$get__account$portfolio$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__account$portfolio$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$account$portfolio$$) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo$account$id = ctx.quovo$account$id
      , response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: quovo$account$id ?
                `/accounts/${quovo$account$id}/portfolios` :
                "/portfolios"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$account$portfolio$$: (yield response$ctx.response.json()).portfolios
  });
}
export function *http$get__portfolio$history(ctx, ...ctx$rest$$) {
  const ctx$rest = clone(...ctx$rest$$);
  log(`${logPrefix}|http$get__portfolio$history`);
  if (ctx.quovo$portfolio$history) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo$portfolio$id = ctx.quovo$portfolio$id
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {
          path: `/portfolios/${quovo$portfolio$id}/history`});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$portfolio$history: (yield response$ctx.response.json()).history
  });
}
export function *http$get__position$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__position$$`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$position$$) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo$account$id = ctx.quovo$account$id
      , response$ctx = yield quovo$fetch.http$get(
            request$ctx,
            {
              path: quovo$account$id ?
                `/accounts/${quovo$account$id}/positions` :
                "/positions"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$position$$: (yield response$ctx.response.json()).positions
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
  const QUOVO_LOGIN = env.QUOVO_LOGIN || (env && env.QUOVO_LOGIN) || throw__error(ctx, {error$message: "env.QUOVO_LOGIN missing"})
      , QUOVO_PASSWORD = env.QUOVO_PASSWORD || (env && env.QUOVO_PASSWORD) || throw__error(ctx, {error$message: "env.QUOVO_PASSWORD missing"});
  return btoa(`${QUOVO_LOGIN}:${QUOVO_PASSWORD}`);
}
export function *http$get__user$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__users`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$user$$) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {path: "/users"});
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$user$$: (yield response$ctx.response.json()).users
  });
}
export function *http$get__user(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$get__user`);
  const ctx$rest = clone(...ctx$rest$$);
  if (ctx.quovo$user) return ctx;
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , quovo$user$id = ctx.quovo$user$id
      , response$ctx = yield quovo$fetch.http$get(request$ctx, {path: `/users/${quovo$user$id}`})
      , quovo$user = (yield response$ctx.response.json()).user
      ;
  return assign(ctx, {
    quovo$access_token: ctx.quovo$access_token,
    quovo$user: quovo$user
  });
}
export function *http$delete__user(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$delete__user`);
  const ctx$rest = clone(...ctx$rest$$);
  if (!ctx.quovo$user$id) throw__error(ctx, {error$message: "ctx.quovo$user$id not defined"});
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest);
  yield quovo$fetch.http$delete(request$ctx, {path: `/users/${request$ctx.quovo$user$id}`});
  delete ctx.quovo$user$id;
  return ctx;
}
export function *http$post__user$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|http$post__user$$`);
  const ctx$rest = clone(...ctx$rest$$);
  yield new__quovo$access_token(ctx);
  const request$ctx = clone(ctx, ctx$rest)
      , response$ctx = yield quovo$fetch.http$post(
          assign__http$headers__contentType__json(request$ctx),
          {path: "/users", body: ctx.body})
      , quovo$user = (yield response$ctx.response.json()).user
      , quovo$user$id = quovo$user.id;
  return assign(ctx, {
    quovo$access_token: response$ctx.quovo$access_token,
    quovo$user: quovo$user,
    quovo$user$id: quovo$user$id
  });
}
function throw__error__ctx$keys$missing(ctx, error$, ...error$rest$$) {
  log(`${logPrefix}|throw__error__ctx$keys$missing`);
  let error$ctx = (ctx && ctx.error$ctx) || {};
  assign(error$ctx, error$, ...error$rest$$);
  let error$message =
    ctx.error$message ||
    (error$ctx && error$ctx.error$message) ||
    `Missing keys: ${JSON.stringify(error$.ctx$keys$missing)}`;
  assign(error$ctx, {
    error$message: error$message,
    http$status: 400,
    http$error$message: "Invalid request"
  });
  assign(ctx, {error$ctx: error$ctx});
  throw__error(ctx);
}
function fetch$ctx(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|fetch$ctx`);
  let ctx$clone = fetch$lib__fetch$ctx(ctx, {url$base: url$base}, ...ctx$rest$$);
  if (["POST", "PUT"].indexOf(ctx$clone.method) > -1) {
    assign__http$headers__contentType__json(ctx$clone);
  }
  return ctx$clone;
}
function assign__ctx$request$headers(ctx, ...header$$) {
  log(`${logPrefix}|assign__ctx$request$headers`);
  assign__fetch$lib__ctx$request$headers(ctx, ...header$$);
  let ctx$headers = ctx.headers;
  const quovo$access_token = ctx.quovo$access_token;
  if (quovo$access_token) {
    ctx$headers["Authorization"] = `Bearer ${quovo$access_token}`;
  }
  return ctx;
}