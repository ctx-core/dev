import {assign,clone} from "ctx-core/object/lib";
import {log,info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/http/lib";
let html$ctx$fn$$ = [];
export function assign__html$ctx$fn() {
  log(`${logPrefix}|assign__html$ctx$fn`);
  html$ctx$fn$$.push(...arguments);
}
export function html$ctx(ctx, ...html$ctx$$) {
  log(`${logPrefix}|html$ctx`);
  let html$ctx$ = {};
  html$ctx$fn$$.forEach(
    html$ctx$fn => assign(html$ctx$, html$ctx$fn(ctx, html$ctx$)));
  assign(html$ctx$, ...html$ctx$$);
  return html$ctx$;
}
// {headers: {"Cache-Control": "public, max-age=3600"}} append
export function assign__http$headers__cache() {
  return assign__http$headers__cache$1hour(...arguments);
}
export function assign__http$headers__cache$5min(ctx, ...headers$$) {
  return assign__http$headers(ctx, {"Cache-Control": "public, max-age=300"}, ...headers$$);
}
export function assign__http$headers__cache$1hour(ctx, ...headers$$) {
  return assign__http$headers(ctx, {"Cache-Control": "public, max-age=3600"}, ...headers$$);
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
export const contentType$json = {"Content-Type": "application/json"};