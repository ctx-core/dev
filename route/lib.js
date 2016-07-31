import {assign,clone} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {change__agents} from "ctx-core/agent/lib";
import co from "co";
import {ensure__agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/lib";
export function route(ctx, ...route$arg$$) {
  log(`${logPrefix}|route`);
  assign(ctx, {route$in_process: true});
  return riot.route(...route$arg$$);
}
export function start__routes(autoExec=true) {
  log(`${logPrefix}|start__routes`);
  riot.route.start(autoExec);
}
export function assign__route$base(ctx, route$base) {
  log(`${logPrefix}|assign__route$base`);
  riot.route.base(route$base);
  change__agents(ctx, {route$base: route$base});
}
export function assign__routes(ctx, ...routes) {
  log(`${logPrefix}|assign__routes`);
  let ctx$routes = ctx.routes || [];
  ctx$routes.push(...routes);
  assign(ctx, {routes: ctx$routes});
  agent__route$name(ctx);
  return ctx;
}
export function agent__route$name(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__route$name`);
  return ensure__agent(ctx, {
    key: "agent__route$name",
    scope: ["route$name"]
  }, ...agent$ctx$$);
}
export function new__routeset(ctx, ...routeset$ctx$$) {
  log(`${logPrefix}|new__routeset`);
  const routeset$ctx = clone(...routeset$ctx$$)
      , new__route$ = routeset$ctx.new__route || new__route
      , path = routeset$ctx.path;
  return [
    new__route$(ctx, routeset$ctx),
    new__route$(ctx, routeset$ctx, {path: `${path}\\?*`})
  ];
}
export function new__route(ctx, ...route$ctx$$) {
  log(`${logPrefix}|new__route`);
  const route$ctx = clone(...route$ctx$$)
      , route = riot.route.create()
      , path = route$ctx.path
      , route$name = route$ctx.route$name
      , new__route$ctx = route$ctx.new__route$ctx
      , fn = route$ctx.fn;
  route(path, co.wrap(route__fn));
  return route;
  function *route__fn() {
    log(`${logPrefix}|new__route|route__fn`, path);
    try {
      const route$fragment = window.location.hash.replace(/^#/, "")
          , route$fragment$split = route$fragment.split("?")
          , route$path = route$fragment$split[0]
          , route$query$str = route$fragment$split.slice(1).join("?")
          , route$query$statement$$ = route$query$str.replace("?", "&").split("&")
          , route$query = route$query$statement$$.reduce(
              (memo, query$statement) => {
                const kv = query$statement.split("=");
                memo[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
                return memo;}, {});
      let route$ctx = new__route$ctx({
        route$fragment: route$fragment,
        route$path: route$path,
        route$path$url: route$path||"/",
        route$query: route$query,
        route$name: route$name
      });
      route$ctx[`route$name__${route$name}`] = true;
      if (fn) fn(route$ctx, ...arguments);
      assign(ctx, {route$in_process: false});
      change__agents(ctx, route$ctx);
    } catch (error$ctx) {
      assign(ctx, {route$in_process: false});
      throw__error(ctx, error$ctx);
    }
  }
}