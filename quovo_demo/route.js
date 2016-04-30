import {assign} from "ctx-core/object/lib";
import {fn$route as route$lib__fn$route,assign__route$$} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "quovo_demo/route";
export function assign__quovo$route$$() {
  log(`${logPrefix}|fn$route$$`);
  let ctx = assign(...arguments);
  return assign__route$$(
    ctx,
    fn$route(ctx, {path: "quovo/users/*", route$name: "quovo$user", fn: fn$route$user$fn(ctx)}),
    fn$route(ctx, {path: "quovo/users/*/accounts/*", route$name: "quovo$user$account", fn: fn$route$user$account$fn(ctx)}),
    fn$route(ctx, {path: "quovo/users/*/accounts/*/portfolios/*", route$name: "quovo$user$account$portfolio", fn: fn$route$user$account$portfolio$fn(ctx)}),
    fn$route(ctx, {path: "quovo/users/*/accounts/*/portfolios/*/history", route$name: "quovo$user$account$portfolio$history", fn: fn$route$user$account$portfolio$fn(ctx)}),
    fn$route(ctx, {path: "quovo/users/*/sync", route$name: "quovo$user$sync", fn: fn$route$user$fn(ctx)}),
    fn$route(ctx, {path: "quovo", route$name: "quovo"})
  );
}
function fn$route$user$fn(ctx) {
  log(`${logPrefix}|fn$route$user$fn`);
  return (route$ctx, quovo$user$id) => {
    route$ctx.quovo$user$id = parseInt(quovo$user$id) || null;
    route$ctx.route__quovo$user$tile = true;
  }
}
function fn$route$user$account$fn(ctx) {
  log(`${logPrefix}|fn$route$user$account$fn`);
  return (route$ctx, quovo$user$id, quovo$account$id) => {
    route$ctx.quovo$user$id = parseInt(quovo$user$id) || null;
    route$ctx.quovo$account$id = parseInt(quovo$account$id) || null;
    route$ctx.route__quovo$user$tile = true;
    route$ctx.route__quovo$account$tile = true;
  }
}
function fn$route$user$account$portfolio$fn(ctx) {
  log(`${logPrefix}|fn$route$user$account$portfolio$fn`);
  return (route$ctx, quovo$user$id, quovo$account$id, quovo$portfolio$id) => {
    route$ctx.quovo$user$id = parseInt(quovo$user$id) || null;
    route$ctx.quovo$account$id = parseInt(quovo$account$id) || null;
    route$ctx.quovo$portfolio$id = parseInt(quovo$portfolio$id) || null;
    route$ctx.route__quovo$user$tile = true;
    route$ctx.route__quovo$account$tile = true;
    route$ctx.route__quovo$portfolio$tile = true;
  }
}
function fn$route(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|fn$route`);
  route$lib__fn$route(ctx, {fn$ctx: fn$ctx}, ...ctx$rest$$);
}
function fn$ctx() {
  log(`${logPrefix}|fn$ctx`);
  return assign({
    route$name__quovo: null,
    route$name__quovo$user$account: null,
    route$name__quovo$user$account$portfolio: null,
    route$name__quovo$user$account$portfolio$history: null,
    route$name__quovo$user: null,
    route$name__quovo$user$sync: null,
    route__quovo$user$tile: null,
    route__quovo$account$tile: null,
    route__quovo$portfolio$tile: null,
    quovo$user$id: null,
    quovo$account$id: null,
    quovo$portfolio$id: null
  }, ...arguments);
}