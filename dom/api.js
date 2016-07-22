import "babel-polyfill";
import {assign} from "ctx-core/object/lib";
import {start__routes,assign__route$base} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dom/api";
log(logPrefix);
const ctx$ = assign({}, riot, {
  mount: mount,
  mount$init: mount$init,
  start__routes: start__routes,
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
  ctx$.mount$init(ctx);
  mount$tags.forEach(mount$tag => riot.mount(mount$tag, {ctx: ctx}));
  assign__route$base(ctx, route$base);
}
export function mount$init(ctx) {
  log(`${logPrefix}|mount$init`);
  ctx$.assign__ctx(ctx);
  return ctx;
}
export function assign__ctx(ctx) {
  log(`${logPrefix}|assign__ctx`);
  return ctx;
}