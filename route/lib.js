/**
 * Route functions using riot-route
 * @module ctx-core/route/lib
 * @see {@link https://github.com/riot/route}
 */
import {assign,clone} from 'ctx-core/object/lib'
import {throw__error} from 'ctx-core/error/lib'
import {change__agents} from 'ctx-core/agent/lib'
import route__riot from 'riot-route'
import co from 'co'
import {route__agent} from 'ctx-core/route/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/route/lib'
/**
 * A riotjs route object.
 * @typedef route
 * @property {function} stop - Stop the route
 * @see {@link http://riotjs.com/api/route/#riotroutefilter-callback}
 */
/**
 * Uses riot-route to assign `ctx.navigate$in_process`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...route$arg} route$arg - the riot-route args
 * @returns {module:ctx-core/route/lib~route}
 * @see {@link http://riotjs.com/api/route/#riotroutecallback}
 * @see {@link http://riotjs.com/api/route/#riotroutefilter-callback}
 * @see {@link http://riotjs.com/api/route/#riotrouteto}
 */
export function navigate(ctx, ...route$arg$$) {
  log(`${logPrefix}|navigate`)
  assign(ctx, {navigate$in_process: true})
  return route__riot(...route$arg$$)
}
/**
 * Start the route engine by calling riot-route start
 * @param {boolean} autoExec - see {@link http://riotjs.com/api/route/#riotroutestartautoexec}
 * @see {@link http://riotjs.com/api/route/#riotroutestart}
 */
export function start__routes() {
  log(`${logPrefix}|start__routes`)
  return route__riot.start(...arguments)
}
/**
 * Sets the riot-route base & assigns `ctx.route$base`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {string} route$base
 * @see {@link http://riotjs.com/api/route/#riotroutebasebase}
 */
export function assign__route$base(ctx, route$base='#') {
  log(`${logPrefix}|assign__route$base`, route$base)
  route__riot.base(route$base)
  assign(ctx, {route$base: route$base})
  return ctx
}
/**
 * Pushes routes to ctx.routes & ensures {module:ctx-core/route/agent~route__agent}
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/route/lib~route} route
 * @returns {module:ctx-core/object/lib~ctx}
 */
export function assign__routes(ctx, ...arg$routes) {
  log(`${logPrefix}|assign__routes`)
  let {routes=[]} = ctx
  routes.push(...arg$routes)
  assign(ctx, {routes})
  route__agent(ctx)
  return ctx
}
/**
 * A collection of riotjs routes.
 * @typedef {module:ctx-core/route/lib~route[]} routeset
 * @see {@link http://riotjs.com/api/route/#riotroutefilter-callback}
 */
/**
 * Configures the route
 * @typedef route$ctx
 * @property {module:ctx-core/route/lib.$route} $route
 * @property {string} path - the path of the route
 * @property {string} route$name - when the route is visited, sets:
 *
 * | ctx.                     |
 * |--------------------------|
 * | route$name               |
 * | route$name__<route$name> |
 * @property {function} $set$ctx - returns {@link module:ctx-core/agent/lib~set$ctx}
 */
/**
 * Returns a new {@link module:ctx-core/route/lib~routeset} for a given path.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/route/lib~route$ctx} route$ctx - Passed to route$ctx.$route
 * @returns {module:ctx-core/route/lib~route[]}
 */
export function $routeset(ctx, ...route$ctx$$) {
  log(`${logPrefix}|$routeset`)
  const route$ctx = clone(...route$ctx$$)
      , $route$ = route$ctx.$route || $route
      , path = route$ctx.path
  return [
    $route$(ctx, route$ctx),
    $route$(ctx, route$ctx, {path: `${path}\\?*`})
  ]
}
/**
 * Returns a new riotjs route with a callback that:
 *
 * - assigns the return value of route$ctx.$set$ctx to ctx
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/route/lib~route$ctx} route$ctx
 * @returns {module:ctx-core/route/lib~route}
 */
export function $route(ctx, ...route$ctx$$) {
  const route$ctx = clone(...route$ctx$$)
      , {path,
        route$name,
        $set$ctx,
        fn} = route$ctx
  log(`${logPrefix}|$route`, path)
  return route__riot(path, co.wrap(route__fn))
  function *route__fn() {
    log(`${logPrefix}|$route|route__fn`, path)
    try {
      const {route$base} = ctx
          , is__hash__route = /^#/.test(route$base)
          , {hash} = window.location
          , route$hash =
              hash
              && hash.replace(route$base, '')
      let route$path, route$query
      if (is__hash__route) {
        const route$hash__query$$ = route$hash.split('?')
        route$path = route$hash__query$$[0]
        route$query = $route$query(route$hash__query$$.slice(1).join('?'))
      } else {
        route$path = window.location.pathname
        const route$query$$ = window.location.search.split('?')
        route$query = $route$query(route$query$$.slice(1).join('?'))
      }
      let set$ctx = $set$ctx({
        route$hash,
        route$path,
        route$path$url: route$path||'/',
        route$query,
        route$name,
        [`route$name__${route$name}`]: true
      })
      if (fn) fn.call(ctx, set$ctx, ...arguments)
      assign(ctx, {navigate$in_process: false})
      change__agents(ctx, set$ctx)
    } catch (error$ctx) {
      assign(ctx, {navigate$in_process: false})
      throw__error(ctx, error$ctx)
    }
  }
}
function $route$query(route$query$str) {
  if (!route$query$str) return {}
  const route$query$statement$$ = route$query$str.replace('?', '&').split('&')
      , route$query = route$query$statement$$.reduce(
          (memo, query$statement) => {
            const kv = query$statement.split('=')
            memo[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1])
            return memo}, {})
  return route$query
}