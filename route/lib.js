import {assign,clone} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {agent$$trigger$change} from "ctx-core/agent/lib";
import riot from "riot";
import co from "co";
import {assign__agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/lib";
export function assign__route$$(ctx, ...route$$) {
  log(`${logPrefix}|assign__route$$`);
  let ctx$route$$ = ctx.routes || [];
  ctx$route$$.push(...route$$);
  assign(ctx, {route$$: ctx$route$$});
  assign__route$name_agent(ctx);
  return ctx;
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
      , fn$ctx = opts$ctx.fn$ctx
      , fn = opts$ctx.fn;
  route(path, co.wrap(function *() {
    log(`${logPrefix}|fn$route|route`, path);
    try {
      let route$ctx = fn$ctx({
        path: window.location.hash.replace(/^#/, ""),
        route$name: route$name
      });
      route$ctx[`route$name__${route$name}`] = true;
      if (fn) fn(route$ctx, ...arguments);
      agent$$trigger$change(ctx, route$ctx);
    } catch(error$ctx) {
      error$throw(ctx, error$ctx);
    }
  }));
  return route;
}
