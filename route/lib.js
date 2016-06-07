import {assign,clone} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {agent$$trigger$change} from "ctx-core/agent/lib";
import riot from "riot";
import co from "co";
import {assign__agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/lib";
export function route(ctx, ...route$arg$$) {
  log(`${logPrefix}|route`);
  assign(ctx, {route$in_process: true});
  return riot.route(...route$arg$$);
}
export function assign__route$$(ctx, ...route$$) {
  log(`${logPrefix}|assign__route$$`);
  let ctx$route$$ = ctx.routes || [];
  ctx$route$$.push(...route$$);
  assign(ctx, {route$$: ctx$route$$});
  assign__route$name_agent(ctx);
  return ctx;
}
export function assign__route$fragment_agent() {
  log(`${logPrefix}|assign__route$fragment_agent`);
  let ctx = assign(...arguments);
  if (!ctx.route$fragment_agent) assign__route$fragment_agent$();
  return ctx;
  function assign__route$fragment_agent$() {
    log(`${logPrefix}|assign__route$fragment_agent$`);
    assign__agent(ctx, {
      key$agent: "route$fragment_agent",
      agent$keys: ["route$fragment"]
    });
  }
}
export function assign__route$name_agent() {
  log(`${logPrefix}|assign__route$name_agent`);
  let ctx = assign(...arguments);
  if (!ctx.route$name_agent) assign__route$name_agent$();
  return ctx;
  function assign__route$name_agent$() {
    log(`${logPrefix}|assign__route$name_agent$`);
    assign__agent(ctx, {
      key$agent: "route$name_agent",
      agent$keys: ["route$name"]
    });
  }
}
export function fn$route(ctx, ...opts$ctx$$) {
  log(`${logPrefix}|fn$route`);
  const opts$ctx = clone(...opts$ctx$$)
      , route = riot.route.create()
      , path = opts$ctx.path
      , route$name = opts$ctx.route$name
      , fn$route$ctx = opts$ctx.fn$route$ctx
      , fn = opts$ctx.fn;
  route(path, co.wrap(function *() {
    log(`${logPrefix}|fn$route|route`, path);
    try {
      const route$fragment = window.location.hash.replace(/^#/, "")
          , route$fragment$split = route$fragment.split("?")
          , route$path = route$fragment$split[0]
          , route$query = route$fragment$split.slice(1).join("?")
          , route$query$statement$$ = route$query.replace("?", "&").split("&")
          , route$query$map = route$query$statement$$.reduce(
              (memo, query$statement) => {
                const kv = query$statement.split("=");
                memo[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
                return memo;}, {});
      let route$ctx = fn$route$ctx({
        route$fragment: route$fragment,
        route$path: route$path,
        route$path$url: route$path||"/",
        route$query$map: route$query$map,
        route$name: route$name
      });
      route$ctx[`route$name__${route$name}`] = true;
      if (fn) fn(route$ctx, ...arguments);
      assign(ctx, {route$in_process: false});
      agent$$trigger$change(ctx, route$ctx);
    } catch(error$ctx) {
      assign(ctx, {route$in_process: false});
      error$throw(ctx, error$ctx);
    }
  }));
  return route;
}
