import {assign,keys,prototypeSmash} from "ctx-core/object/lib";
import closest from "closest"
import parseUri from "parseUri";
import riot from "riot";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/tag/lib";
export function fn$tag(tag, ...rest) {
  assign(tag.opts, prototypeSmash(tag.opts), {
    assign__ctx$update: assign__ctx$update,
    self$update: self$update
  }, ...rest);
  assign(tag, tag.opts);
  return tag;
}
export function tag$tags__assign__ctx$update(tag, ...ctx$$) {
  log(`${logPrefix}|tag$tags__assign__ctx$update`);
  const ctx = assign(...ctx$$)
      , tags = tag.tags;
  keys(tags).forEach(
    tag$child$key => {
      const tag$child = tag$child$key && tags[tag$child$key];
      return tag$child && tag$child.assign__ctx$update && tag$child.assign__ctx$update(ctx);
    });
}
export const link$onclick = link$onclick$fn();
export function link$onclick$fn(ctx={}) {
  const tag$name = ctx.tag$name || "a"
      , href$key = ctx.href$key || "href";
  return (e) => {
    const $a = closest(e.target, tag$name, true);
    log(`${logPrefix}|link$onclick`);
    e.preventDefault();
    riot.route(parseUri($a[href$key]).path);
  };
}
export function fn$assign__ctx$update(fn$ctx={}) {
  log(`${logPrefix}|fn$assign__ctx$update`);
  return function assign__ctx$update() {
    log(`${logPrefix}|assign__ctx$update`);
    let ctx = assign(this.ctx, ...arguments);
    assign(this, {ctx: ctx});
    if (fn$ctx.before) fn$ctx.before.call(this, ctx);
    this.self$update();
    if (fn$ctx.after) fn$ctx.after.call(this, ctx);
  }
}
export const assign__ctx$update = fn$assign__ctx$update();
export function self$update() {
  log(`${logPrefix}|self$update`);
  this.update();
}