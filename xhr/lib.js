import {assign,clone,keys} from "ctx-core/object/lib";
import {array$concat$$} from "ctx-core/array/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import XMLHttpRequest from "xhr2";
export let xhr = XhrFn();
const logPrefix = "ctx-core/xhr/lib";
export function XhrFn() {
  return assign(xhr, {
    xhr$ctx: xhr$ctx,
    xhr$onload$fn: xhr$onload$fn,
    xhr$onerror$fn: xhr$onerror$fn,
    ctx$request$setRequestHeader: ctx$request$setRequestHeader,
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
        , request = new XMLHttpRequest()
        , beforeSend = ctx.beforeSend || function() {}
        , body = ctx.body;
    assign(ctx, {
      url: url,
      request: request,
      body: body,
      beforeSend: beforeSend
    });
    return new Promise(
      (resolve, reject) => {
        log(`${logPrefix}|xhr|Promise`, method, url);
        const promise$ctx = {
          resolve: resolve,
          reject: reject
        };
        request.open(method, url, true);
        request.onload = xhr$onload$fn(ctx, promise$ctx);
        request.onerror = xhr$onerror$fn(ctx, promise$ctx);
        xhr.ctx$request$setRequestHeader(ctx);
        beforeSend(request);
        request.send(body);
      }).catch(
        error$ctx =>
          error$throw(ctx, error$ctx));
  }
  function xhr$ctx() {
    return clone(...arguments);
  }
  function xhr$onload$fn(ctx, ...promise$ctx$$) {
    log(`${logPrefix}|xhr$onload$fn`);
    return function() {
      log(`${logPrefix}|xhr$onload$fn|fn`);
      const promise$ctx = assign(...promise$ctx$$)
          , request = ctx.request;
      if (request.status >= 200 && request.status < 400) {
        log(`${logPrefix}|xhr$onload$fn|success`, request.status);
        promise$ctx.resolve(ctx);
      } else {
        error(`${logPrefix}|xhr$onload$fn|error\n`, ctx.method, ctx.url || ctx.path, JSON.stringify(ctx.headers), ctx.body, "\n", request.status, request.responseText);
        // error from the server
        promise$ctx.reject(ctx);
      }
    };
  }
  function xhr$onerror$fn(ctx, promise$ctx) {
    return function(error$ctx) {
      error("Connection Error");
      error(`${logPrefix}|xhr$onerror$fn`, error$ctx);
      assign(ctx, {error$message: error$ctx});
      promise$ctx.reject(ctx);
    };
  }
  function ctx$request$setRequestHeader(ctx) {
    log(`${logPrefix}|ctx$request$setRequestHeader`);
    const headers = ctx.headers || {}
        , request = ctx.request;
    keys(headers).forEach(function(headers$key) {
      request.setRequestHeader(
        headers$key,
        headers[headers$key]
      );
    });
    return ctx;
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
  assign(...array$concat$$([headers], ...headers$$));
  ctx.headers = headers;
  return ctx;
}
export const contentType$json = {"Content-Type": "application/json"};