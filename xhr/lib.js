import {assign,clone} from "ctx-core/object/lib";
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
    const method = fn$http$method(ctx)
        , url = fn$http$url(ctx)
        , body = ctx.body;
    assign(ctx, {
      url: url,
      body: body
    });
    return catch$error$throw(
      ctx,
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
        co$fetch$then$error(ctx, promise$ctx);
      }
    };
  }
  function co$fetch$then$error(ctx, promise$ctx) {
    log(`${logPrefix}|co$fetch$then$error`);
    const response = ctx.response;
    co(function *() {
      log(`${logPrefix}|co$fetch$then$error|co`);
      const contentType = response.headers.get("content-type");
      let error$ctx = {response: response, response$status: response.status};
      if (contentType.indexOf("application/json") !== -1) {
        log(`${logPrefix}|co$fetch$then$error|co|json`);
        const ctx$response$json = yield response.json();
        error(
          `${logPrefix}|fetch$then|error|co\n`,
          ctx.method, ctx.url || ctx.path, "\n",
          JSON.stringify(response.headers), "\n",
          JSON.stringify(ctx$response$json), "\n",
          response.status);
        // error from the server
        assign(error$ctx, ctx$response$json);
      } else {
       log(`${logPrefix}|co$fetch$then$error|co|else`);
        const error$message = yield response.text();
        assign(error$ctx, {error$message: error$message});
      }
      promise$ctx.reject(error$ctx);
    });
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