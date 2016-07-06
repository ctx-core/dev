import {assign,clone} from "ctx-core/object/lib";
import {array$concat} from "ctx-core/array/lib";
import {throw__error} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import isomorphic$fetch from "isomorphic-fetch";
export let fetch = new__fetch();
const logPrefix = "ctx-core/fetch/lib";
// TODO: Remove wrapping logic & use bare-bones fetch where possible
export function new__fetch() {
  return assign(fetch, {
    fetch$ctx: fetch$ctx,
    fetch$then__fn: fetch$then__fn,
    fetch$catch__fn: fetch$catch__fn,
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
    if (!ctx.url && ! ctx.path) throw__error(ctx, {error$message: "no url or path defined"});
    const method = new__http$method(ctx)
        , url = new__http$url(ctx)
        , body = ctx.body;
    fetch.assign__ctx$request$headers(ctx, {
      method: method,
      url: url,
      body: body
    });
    return isomorphic$fetch(url, ctx)
      .then(fetch$then__fn(ctx))
      .catch(fetch$catch__fn(ctx))
  }
  function fetch$ctx() {
    return clone(...arguments);
  }
  function fetch$then__fn(ctx) {
    return (response) => {
      log(`${logPrefix}|fetch$then__fn|fn`);
      assign(ctx, {response: response});
      return ctx;
    }
  }
  function fetch$catch__fn(ctx) {
    return (error$message) => {
      log(`${logPrefix}|fetch$catch__fn|fn`);
      error("Connection Error");
      error(`${logPrefix}|fetch$catch__fn`, error$message);
      assign(ctx, {error$message: error$message});
      return ctx;
    };
  }
  function *http$get(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$get`);
    return yield fetch(ctx, ...(array$concat(ctx$rest$$, {method: "GET"})));
  }
  function *http$put(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$put`);
    return yield fetch(ctx, ...(array$concat(ctx$rest$$, {method: "PUT"})));
  }
  function *http$post(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$post`);
    return yield fetch(ctx, ...(array$concat(ctx$rest$$, {method: "POST"})));
  }
  function *http$delete(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$delete`);
    return yield fetch(ctx, ...(array$concat(ctx$rest$$, {method: "DELETE"})));
  }
  function *http$patch(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$patch`);
    return yield fetch(ctx, ...(array$concat(ctx$rest$$, {method: "PATCH"})));
  }
}
export function new__http$descriptor() {
  log(`${logPrefix}|new__http$descriptor`);
  const ctx = assign(...arguments);
  return `${new__http$method(ctx)} ${new__http$url(ctx)}`;
}
export function new__http$method() {
  log(`${logPrefix}|new__http$method`);
  const ctx = assign(...arguments);
  return (ctx.method || "GET").toUpperCase();
}
export function new__http$url() {
  log(`${logPrefix}|new__http$url`);
  const ctx = assign(...arguments)
      , url = ctx.url || `${ctx.url$base || ""}${ctx.path}`;
  return url;
}
export function assign__ctx$request$headers(ctx, ...headers) {
  log(`${logPrefix}|assign__ctx$request$headers`);
  if (!ctx.headers) ctx.headers = clone(...headers);
  return ctx;
}