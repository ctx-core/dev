import "babel-polyfill";
import {assign} from "ctx-core/object/lib";
import {route$start,assign__route$base} from "ctx-core/route/lib";
import riot from "riot";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dom/api";
log(logPrefix);
const ctx$ = assign({}, riot, {
  mount: mount,
  mount$init: mount$init,
  route$start: route$start
});
export default ctx$;
global.ctx$ = ctx$;
export function mount() {
  log(`${logPrefix}|mount`);
  const mount$ctx = assign(...arguments)
      , mount$tag$$ = mount$ctx.mount$tag$$
      , route$base = mount$ctx.route$base || "#";
  let ctx = mount$ctx.ctx;
  global.riot = riot;
  global.ctx = ctx;
  this.mount$init(ctx);
  mount$tag$$.forEach(mount$tag => riot.mount(mount$tag, {ctx: ctx}));
  assign__route$base(ctx, route$base);
}
export function mount$init(ctx) {
  log(`${logPrefix}|mount$init`);
  return ctx;
}