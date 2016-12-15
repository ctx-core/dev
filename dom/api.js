/**
 * External function api for ctx-core to be used in a dom environment
 * @module ctx-core/dom/api
 */
import {assign} from 'ctx-core/object/lib'
import {assign__route$base} from 'ctx-core/route/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/api'
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