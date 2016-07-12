import {assign} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/http/lib";
let new__html$ctx__store = [];
export function assign__new__html$ctx__fn() {
  log(`${logPrefix}|assign__new__html$ctx__fn`);
  new__html$ctx__store.push(...arguments);
}
export function new__html$ctx(ctx, ...html$ctx$$) {
  log(`${logPrefix}|new__html$ctx`);
  let html$ctx = {};
  new__html$ctx__store.forEach(
    new__html$ctx => assign(html$ctx, new__html$ctx(ctx, html$ctx)));
  assign(html$ctx, ...html$ctx$$);
  return html$ctx;
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
export function assign__http$headers__contentType__json(ctx, ...headers$$) {
  return assign__http$headers(ctx, contentType__json, ...headers$$);
}
export function assign__http$headers(ctx, ...headers$$) {
  const headers = ctx.headers || {};
  assign(headers, ...headers$$);
  ctx.headers = headers;
  return ctx;
}
export const contentType__json = {"Content-Type": "application/json"};