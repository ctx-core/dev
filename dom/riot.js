import {assign} from 'ctx-core/object/lib'
import {assign__route$base} from 'ctx-core/route/lib'
import 'ctx-core/dom/polyfill'
import riot from 'riot'
import {$anchor__url} from 'ctx-core/dom/lib'
import {change__agents} from 'ctx-core/agent/lib'
import riot$route from 'riot-route'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/riot'
log(logPrefix)
/**
 * The global ctx to be used in the dom.
 * @typedef {module:ctx-core/object/lib~ctx} ctx
 * @external ctx
 */
/**
 * A control api for ctx-core & libraries using ctx-core
 * @typedef {module:ctx-core/object/lib~ctx} $ctx
 * @property {function} mount - Mounts to dom environment.
 * @property {function} assign__ctx - Can be overridden to assign to the ctx.
 * @external $ctx
 */
const $ctx = assign(global.$ctx || {}, riot, {
  mount,
  assign__ctx
})
export default $ctx
//noinspection JSAnnotator
global.$ctx = $ctx
export function mount() {
  log(`${logPrefix}|mount`)
  const mount$ctx = assign(...arguments)
      , {mount} = mount$ctx
  let {ctx} = mount$ctx
  window.ctx = ctx
  $ctx.assign__ctx(ctx)
  const riot$route$base =
          ctx.route$base
          || mount$ctx.route$base
          || '#'
  assign__route$base(ctx, riot$route$base)
  for (let i=0; i < mount.length; i++) {
    const mount$ = mount[i]
    riot.mount(mount$, {ctx})
  }
  return ctx
}
export function assign__ctx(ctx) {
  log(`${logPrefix}|assign__ctx`)
  return ctx
}
export function riot$route$anchor__url(route__fn) {
  log(`${logPrefix}|riot$route$anchor__url`)
  const route = riot$route.create()
  route('*', anchor => {
    try {
      log(`${logPrefix}|riot$route$anchor__url|route|*`, anchor)
      if (route__fn) $anchor__url__route__fn$(route__fn)
    } catch (e) {
      error(e)
      throw e
    }
  })
  return route
}
export function $anchor__url__route__fn$(route__fn) {
  log(`${logPrefix}|$anchor__url__route__fn`)
  route__fn($anchor__url())
}
export function route$anchor__url__fn(ctx) {
  log(`${logPrefix}|route$anchor__url__fn`)
  return (anchor$ctx) => {
    log(`${logPrefix}|route$anchor__url__fn|fn`, ctx, anchor$ctx)
    change__agents(ctx, anchor$ctx)
  }
}