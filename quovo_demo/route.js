import {assign} from "ctx-core/object/lib";
import {router__tag$mount} from "ctx-core/route/tag";
import {agent$$trigger$change} from "ctx-core/agent/lib";
import {
  route$start,
  fn$route$with_query$$,
  fn$route as route$lib__fn$route,
  assign__routes} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "quovo_demo/route";
export function quovo$router__tag$mount(tag, ...route$ctx$$) {
  log(`${logPrefix}|quovo$router__tag$mount`);
  let ctx = tag.ctx;
  router__tag$mount(tag, {
    assign__routes$fn: assign__quovo$routes,
    route$query$map$on$change: route$query$map$on$change
  }, ...route$ctx$$);
  route$start();
  return tag;
  function route$query$map$on$change() {
    log(`${logPrefix}|msci_demo$route__tag$mount|route$query$map$on$change`);
    const route$query$map = ctx.route$query$map
        , update$ctx = {};
    agent$$trigger$change(ctx, update$ctx);
  }
}
export function assign__quovo$routes() {
  log(`${logPrefix}|fn$routes`);
  let ctx = assign(...arguments);
  return assign__routes(
    ctx,
    ...fn$route$with_query$$(ctx, {
      path: "quovo/users/*",
      route$name: "quovo$user",
      fn: user$fn__fn$route(ctx),
      fn$route: fn$route}),
    ...fn$route$with_query$$(ctx, {
      path: "quovo/users/*/accounts/*",
      route$name: "quovo$user$account",
      fn: user$account$fn__fn$route(ctx),
      fn$route: fn$route}),
    ...fn$route$with_query$$(ctx, {
      path: "quovo/users/*/accounts/*/portfolios/*",
      route$name: "quovo$user$account$portfolio",
      fn: user$account$portfolio$fn__fn$route(ctx),
      fn$route: fn$route}),
    ...fn$route$with_query$$(ctx, {
      path: "quovo/users/*/accounts/*/portfolios/*/history",
      route$name: "quovo$user$account$portfolio$history",
      fn: user$account$portfolio$fn__fn$route(ctx),
      fn$route: fn$route}),
    ...fn$route$with_query$$(ctx, {
      path: "quovo/users/*/sync",
      route$name: "quovo$user$sync",
      fn: user$fn__fn$route(ctx),
      fn$route: fn$route}),
    ...fn$route$with_query$$(ctx, {
      path: "quovo",
      route$name: "quovo",
      fn$route: fn$route})
  );
}
function user$fn__fn$route(ctx) {
  log(`${logPrefix}|user$fn__fn$route`);
  return (route$ctx, quovo$user$id) => {
    route$ctx.quovo$user$id = parseInt(quovo$user$id) || null;
    route$ctx.route__quovo$user$tile = true;
  }
}
function user$account$fn__fn$route(ctx) {
  log(`${logPrefix}|user$account$fn__fn$route`);
  return (route$ctx, quovo$user$id, quovo$account$id) => {
    route$ctx.quovo$user$id = parseInt(quovo$user$id) || null;
    route$ctx.quovo$account$id = parseInt(quovo$account$id) || null;
    route$ctx.route__quovo$user$tile = true;
    route$ctx.route__quovo$account$tile = true;
  }
}
function user$account$portfolio$fn__fn$route(ctx) {
  log(`${logPrefix}|user$account$portfolio$fn__fn$route`);
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
  return route$lib__fn$route(ctx, {fn$route$ctx: fn$ctx}, ...ctx$rest$$);
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