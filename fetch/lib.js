import {assign,clone} from "ctx-core/object/lib";
import {array$concat$$} from "ctx-core/array/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import isomorphic$fetch from "isomorphic-fetch";
export let fetch = fn$fetch();
const logPrefix = "ctx-core/fetch/lib";
// TODO: Remove wrapping logic & use bare-bones fetch where possible
export function fn$fetch() {
  return assign(fetch, {
    fetch$ctx: fetch$ctx,
    fetch$then$fn: fetch$then$fn,
    fetch$catch$fn: fetch$catch$fn,
    assign__ctx$request$headers: assign__ctx$request$headers,
    http$get: http$get,
    http$put: http$put,
    http$post: http$post,
    http$delete: http$delete,
    http$patch: http$patch
  });
  function fetch() {
    log(`${logPrefix}|fetch`);
    const ctx = fetch.fetch$ctx(...arguments);
    if (!ctx.url && ! ctx.path) error$throw(ctx, {error$message: "no url or path defined"});
    const method = fn$http$method(ctx)
        , url = fn$http$url(ctx)
        , body = ctx.body;
    fetch.assign__ctx$request$headers(ctx, {
      method: method,
      url: url,
      body: body
    });
    return isomorphic$fetch(url, ctx)
      .then(fetch$then$fn(ctx))
      .catch(fetch$catch$fn(ctx))
  }
  function fetch$ctx() {
    return clone(...arguments);
  }
  function fetch$then$fn(ctx) {
    return (response) => {
      log(`${logPrefix}|fetch$then$fn|fn`);
      assign(ctx, {response: response});
      return ctx;
    }
  }
  function fetch$catch$fn(ctx) {
    return (error$message) => {
      log(`${logPrefix}|fetch$catch$fn|fn`);
      error("Connection Error");
      error(`${logPrefix}|fetch$catch$fn`, error$message);
      assign(ctx, {error$message: error$message});
      return ctx;
    };
  }
  function *http$get(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$get`);
    return yield fetch(ctx, ...(array$concat$$(ctx$rest$$, {method: "GET"})));
  }
  function *http$put(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$put`);
    return yield fetch(ctx, ...(array$concat$$(ctx$rest$$, {method: "PUT"})));
  }
  function *http$post(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$post`);
    return yield fetch(ctx, ...(array$concat$$(ctx$rest$$, {method: "POST"})));
  }
  function *http$delete(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$delete`);
    return yield fetch(ctx, ...(array$concat$$(ctx$rest$$, {method: "DELETE"})));
  }
  function *http$patch(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$patch`);
    return yield fetch(ctx, ...(array$concat$$(ctx$rest$$, {method: "PATCH"})));
  }
}
export function fn$http$descriptor() {
  log(`${logPrefix}|fn$http$descriptor`);
  const ctx = assign(...arguments);
  return `${fn$http$method(ctx)} ${fn$http$url(ctx)}`;
}
export function fn$http$method() {
  log(`${logPrefix}|fn$http$method`);
  const ctx = assign(...arguments);
  return (ctx.method || "GET").toUpperCase();
}
export function fn$http$url() {
  log(`${logPrefix}|fn$http$url`);
  const ctx = assign(...arguments)
      , url = ctx.url || `${ctx.url$base || ""}${ctx.path}`;
  return url;
}
export function assign__ctx$request$headers(ctx, ...headers) {
  log(`${logPrefix}|assign__ctx$request$headers`);
  if (!ctx.headers) ctx.headers = clone(...headers);
  return ctx;
}