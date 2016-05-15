import {assign,clone,keys} from "ctx-core/object/lib";
import {array$concat$$} from "ctx-core/array/lib";
import {catch$error$throw} from "ctx-core/promise/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import "isomorphic-fetch";
import co from "co";
export let xhr = XhrFn();
const logPrefix = "ctx-core/xhr/lib";
// TODO: Remove wrapping logic & use bare-bones fetch where possible
export function XhrFn() {
  return assign(xhr, {
    xhr$ctx: xhr$ctx,
    fetch$then: fetch$then,
    fetch$catch: fetch$catch,
    assign__ctx$request$headers: assign__ctx$request$headers,
    http$get: http$get,
    http$put: http$put,
    http$post: http$post,
    http$delete: http$delete,
    http$patch: http$patch
  });
  function xhr() {
    log(`${logPrefix}|xhr`);
    const ctx = xhr.xhr$ctx(...arguments);
    if (!ctx.url && ! ctx.path) error$throw(ctx, {error$message: "no url or path defined"});
    const method = (ctx.method || "GET").toUpperCase()
        , url$base = ctx.url$base || ""
        , url = ctx.url || `${url$base}${ctx.path}`
        , body = ctx.body;
    assign(ctx, {
      url: url,
      body: body
    });
    return catch$error$throw(
      new Promise(
        (resolve, reject) => {
          log(`${logPrefix}|xhr|Promise`, method, url);
          xhr.assign__ctx$request$headers(ctx);
          const promise$ctx = {
            resolve: resolve,
            reject: reject
          };
          fetch(url, ctx)
            .then(fetch$then(ctx, promise$ctx))
            .catch(fetch$catch(ctx, promise$ctx));
        }));
  }
  function xhr$ctx() {
    return clone(...arguments);
  }
  function fetch$then(ctx, ...promise$ctx$$) {
    log(`${logPrefix}|fetch$then`);
    return (response) => {
      log(`${logPrefix}|fetch$then|fn`);
      const promise$ctx = assign(...promise$ctx$$);
      assign(ctx, {response: response});
      if (response.status >= 200 && response.status < 400) {
        log(`${logPrefix}|fetch$then|success`, response.status);
        promise$ctx.resolve(ctx);
      } else {
        log(`${logPrefix}|fetch$then|fn|error`);
        const ctx$response = ctx.response;
        co(function *() {
          log(`${logPrefix}|fetch$then|fn|error|co`);
          const ctx$response$json = yield ctx$response.json();
          error(
            `${logPrefix}|fetch$then|error|co\n`,
            ctx.method, ctx.url || ctx.path, "\n",
            JSON.stringify(ctx$response.headers), "\n",
            JSON.stringify(ctx$response$json), "\n",
            response.status);
          // error from the server
          assign(ctx, {error$ctx: ctx$response$json});
          promise$ctx.reject(ctx);
        });
      }
    };
  }
  function fetch$catch(ctx, promise$ctx) {
    return (error$message) => {
      log(`${logPrefix}|fetch$catch|fn`);
      error("Connection Error");
      error(`${logPrefix}|fetch$catch`, error$message);
      assign(ctx, {error$message: error$message});
      promise$ctx.reject(ctx);
    };
  }
  function *http$get(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$get`);
    return yield xhr(ctx, ...(array$concat$$(ctx$rest$$, {method: "GET"})));
  }
  function *http$put(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$put`);
    return yield xhr(ctx, ...(array$concat$$(ctx$rest$$, {method: "PUT"})));
  }
  function *http$post(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$post`);
    return yield xhr(ctx, ...(array$concat$$(ctx$rest$$, {method: "POST"})));
  }
  function *http$delete(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$delete`);
    return yield xhr(ctx, ...(array$concat$$(ctx$rest$$, {method: "DELETE"})));
  }
  function *http$patch(ctx, ...ctx$rest$$) {
    log(`${logPrefix}|http$patch`);
    return yield xhr(ctx, ...(array$concat$$(ctx$rest$$, {method: "PATCH"})));
  }
}
// {headers: {"Content-Type": "application/json"}} append
export function assign__http$headers__contentType$json(ctx, ...headers$$) {
  return assign__http$headers(ctx, contentType$json, ...headers$$);
}
export function assign__http$headers(ctx, ...headers$$) {
  const headers = ctx.headers || {};
  assign(headers, ...headers$$);
  ctx.headers = headers;
  return ctx;
}
export function assign__ctx$request$headers(ctx, ...headers) {
  log(`${logPrefix}|assign__ctx$request$headers`);
  if (!ctx.headers) ctx.headers = clone(...headers);
  return ctx;
}
export const contentType$json = {"Content-Type": "application/json"};