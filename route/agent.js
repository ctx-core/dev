/**
 * Route agents
 * @module ctx-core/route/agent
 */
import {ensure__agent} from 'ctx-core/agent/lib'
import 'riot-route'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/route/agent'
/**
 * An {module:ctx-core/agent/lib~agent} that is used to other ensure route agents & set ctx properties in route__agent.scope.
 *
 * route agents include:
 *
 * - route__agent
 * - route$hash__agent
 * - route$query__agent
 * @property {string} key='route_agent'
 * @property {array<string>} scope - defaults to<br/>
 * <pre>
 *   [
 *     'route__agent',
 *     'route$hash',
 *     'route$path',
 *     'route$path$url',
 *     'route$query',
 *     'route'
 *   ]
 * </pre>
 * @typedef route__agent
 */
/**
 * Ensures a {module:ctx-core/route/agent~route__agent}
 * @param ctx
 * @param ctx__agent$$
 * @returns {*}
 */
export function route__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|route__agent`)
  route$hash__agent(ctx)
  route$query__agent(ctx)
  return ensure__agent(ctx, {
    key: 'route__agent',
    scope: [
      'route',
      'route$hash',
      'route$path',
      'route$path$url',
      'route$query']
  }, ...ctx__agent$$)
}
export function route$hash__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|route$hash__agent`)
  return ensure__agent(ctx, {
    key: 'route$hash__agent',
    scope: ['route$hash']
  }, ...ctx__agent$$)
}
export function route$query__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|route$query__agent`)
  return ensure__agent(ctx, {
    key: 'route$query__agent',
    scope: ['route$query']
  }, ...ctx__agent$$)
}