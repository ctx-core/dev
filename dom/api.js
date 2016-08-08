/**
 * External function api for ctx-core to be used in a dom environment
 * @module ctx-core/dom/api
 */
import "babel-polyfill";
import {assign} from "ctx-core/object/lib";
import {assign__route$base} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dom/api";
log(logPrefix);
/**
 * The global ctx to be used in the dom.
 * @typedef {module:ctx-core/object/lib~ctx} ctx
 * @external ctx
 */
/**
 * A control api for ctx-core & libraries using ctx-core
 * @typedef {module:ctx-core/object/lib~ctx} ctx$
 * @property {function} mount - Mounts to dom environment.
 * @property {function} assign__ctx - Can be overridden to assign to the ctx.
 * @external ctx$
 */
const ctx$ = assign({}, riot, {
  mount: mount,
  assign__ctx: assign__ctx
});
export default ctx$;
//noinspection JSAnnotator
global.ctx$ = ctx$;
export function mount() {
  log(`${logPrefix}|mount`);
  const mount$ctx = assign(...arguments)
      , mount$tags = mount$ctx.mount$tags
      , route$base = mount$ctx.route$base || "#";
  let ctx = mount$ctx.ctx;
  window.ctx = ctx;
  ctx$.assign__ctx(ctx);
  assign__route$base(ctx, route$base);
  mount$tags.forEach(
    mount$tag =>
      riot.mount(mount$tag, {ctx: ctx}));
  return ctx;
}
export function assign__ctx(ctx) {
  log(`${logPrefix}|assign__ctx`);
  return ctx;
}