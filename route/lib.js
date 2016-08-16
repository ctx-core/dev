/**
 * Route functions using riot.routes
 * @module ctx-core/route/lib
 */
import {assign,clone,pick} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {change__agents} from "ctx-core/agent/lib";
import co from "co";
import {route__agent,route$name__agent} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/lib";
/**
 * A riotjs route object.
 * @typedef route
 * @property {function} stop - Stop the route
 * @see {@link http://riotjs.com/api/route/#riotroutefilter-callback}
 */
/**
 * Calls riot.route & assigns ctx.navigate$in_process
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...route$arg} route$arg - the riot.route args
 * @returns {module:ctx-core/route/lib~route}
 * @see {@link http://riotjs.com/api/route/#riotroutecallback}
 * @see {@link http://riotjs.com/api/route/#riotroutefilter-callback}
 * @see {@link http://riotjs.com/api/route/#riotrouteto}
 */
export function navigate(ctx, ...route$arg$$) {
  log(`${logPrefix}|navigate`);
  assign(ctx, {navigate$in_process: true});
  return riot.route(...route$arg$$);
}
/**
 * Start the route engine by calling riot.route.start
 * @param {boolean} autoExec - see {@link http://riotjs.com/api/route/#riotroutestartautoexec}
 * @see {@link http://riotjs.com/api/route/#riotroutestart}
 */
export function start__routes() {
  log(`${logPrefix}|start__routes`);
  return riot.route.start(...arguments);
}
/**
 * Sets the riot.route.base & assigns ctx.route$base
 * @param {module:ctx-core/object/lib~ctx}
 * @param {string} route$base
 * @see {@link http://riotjs.com/api/route/#riotroutebasebase}
 */
export function assign__route$base(ctx, route$base) {
  log(`${logPrefix}|assign__route$base`);
  riot.route.base(route$base);
  assign(ctx, {route$base: route$base});
  return ctx;
}
/**
 * Pushes routes to ctx.routes & ensures {module:ctx-core/route/agent~route__agent}
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/route/lib~route} route
 * @returns {module:ctx-core/object/lib~ctx}
 */
export function assign__routes(ctx, ...routes) {
  log(`${logPrefix}|assign__routes`);
  let ctx$routes = ctx.routes || [];
  ctx$routes.push(...routes);
  assign(ctx, {routes: ctx$routes});
  route__agent(ctx);
  return ctx;
}
/**
 * A collection of riotjs routes.
 * @typedef {module:ctx-core/route/lib~route[]} routeset
 * @see {@link http://riotjs.com/api/route/#riotroutefilter-callback}
 */
/**
 * Configures the route
 * @typedef route$ctx
 * @property {module:ctx-core/route/lib.new__route} new__route
 * @property {string} path - the path of the route
 * @property {string} route$name - when the route is visited, sets:
 *
 * | ctx.                     |
 * |--------------------------|
 * | route$name               |
 * | route$name__<route$name> |
 * @property {function} new__set$ctx - returns {@link module:ctx-core/agent/lib~set$ctx}
 */
/**
 * Returns a new {@link module:ctx-core/route/lib~routeset} for a given path.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/route/lib~route$ctx} route$ctx - Passed to route$ctx.new__route
 * @returns {module:ctx-core/route/lib~route[]}
 */
export function new__routeset(ctx, ...route$ctx$$) {
  log(`${logPrefix}|new__routeset`);
  const route$ctx = clone(...route$ctx$$)
      , new__route$ = route$ctx.new__route || new__route
      , path = route$ctx.path;
  return [
    new__route$(ctx, route$ctx),
    new__route$(ctx, route$ctx, {path: `${path}\\?*`})
  ];
}
/**
 * Returns a new riotjs route with a callback that:
 *
 * - assigns the return value of route$ctx.new__set$ctx to ctx
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/route/lib~route$ctx} route$ctx
 * @returns {module:ctx-core/route/lib~route}
 */
export function new__route(ctx, ...route$ctx$$) {
  const route$ctx = clone(...route$ctx$$)
      , path = route$ctx.path
      , route$name = route$ctx.route$name
      , new__set$ctx = route$ctx.new__set$ctx
      , fn = route$ctx.fn;
  log(`${logPrefix}|new__route`, path);
  return riot.route(path, co.wrap(route__fn));
  function *route__fn() {
    log(`${logPrefix}|new__route|route__fn`, path);
    try {
      const route$hash = window.location.hash.replace(/^#/, "")
          , route$hash$split = route$hash.split("?")
          , route$path = route$hash$split[0]
          , route$query$str = route$hash$split.slice(1).join("?")
          , route$query$statement$$ = route$query$str.replace("?", "&").split("&")
          , route$query = route$query$statement$$.reduce(
              (memo, query$statement) => {
                const kv = query$statement.split("=");
                memo[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
                return memo;}, {});
      let set$ctx = new__set$ctx({
        route$hash: route$hash,
        route$path: route$path,
        route$path$url: route$path||"/",
        route$query: route$query,
        route$name: route$name,
        [`route$name__${route$name}`]: true
      });
      if (fn) fn(set$ctx, ...arguments);
      assign(ctx, {navigate$in_process: false});
      change__agents(ctx, set$ctx);
    } catch (error$ctx) {
      assign(ctx, {navigate$in_process: false});
      throw__error(ctx, error$ctx);
    }
  }
}