import {assign,clone} from "ctx-core/object/lib";
import {registerElement} from "ctx-core/dom/lib";
import closest from "closest"
import parseUri from "parseUri";
import {route} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/tag/lib";
export function tag__assign(tag, ...tag_overrides$$) {
  log(`${logPrefix}|tag__assign`, tag);
  let opts = tag.opts;
  const tag_overrides = clone(...tag_overrides$$);
  tag_overrides.registerElement = [].concat(...tag_overrides.registerElement);
  tag_overrides.registerElement.push(tag.root.tagName);
  assign(tag, {
    ctx: opts.ctx,
    update__ctx: update__ctx.bind(tag),
    link__onclick__in: link__onclick__in.bind(tag),
    link__onclick__out: link__onclick__out.bind(tag)
  }, tag_overrides);
  tag_overrides.registerElement.forEach(
    element =>
      registerElement(element));
  return tag;
}
export const link__onclick__out = new__link__onclick__out();
export function new__link__onclick__out(ctx={}) {
  const tag$name = ctx.tag$name || "a"
      , href$key = ctx.href$key || "href";
  return (e) => {
    log(`${logPrefix}|link__onclick__out`);
    e.preventDefault();
    const dom$a = closest(e.target, tag$name, true);
    window.location.href = dom$a[href$key];
  };
}
export const link__onclick__in = new__link__onclick__in();
export function new__link__onclick__in(ctx={}) {
  const tag$name = ctx.tag$name || "a"
      , href$key = ctx.href$key || "href";
  return (e) => {
    const $a = closest(e.target, tag$name, true);
    log(`${logPrefix}|link__onclick__in`);
    e.preventDefault();
    const link$uri = parseUri($a[href$key])
        , link$uri$query = link$uri.query
        , link$uri$path = link$uri.path
        , query = link$uri$query ? `?${link$uri$query}` : "";
    route(ctx, `${link$uri$path}${query}`);
  };
}
export function schedule__update__ctx(tag, timeout=0) {
  log(`${logPrefix}|schedule__update__ctx`);
  setTimeout(() => tag.update__ctx(), timeout);
}
export function new__update__ctx(new__ctx={}) {
  log(`${logPrefix}|new__update__ctx`);
  return function update() {
    log(`${logPrefix}|new__update__ctx|update`, this.root);
    let ctx = assign(this.ctx, ...arguments);
    assign(this, {ctx: ctx});
    if (new__ctx.before) new__ctx.before.call(this, ctx);
    this.update();
    if (new__ctx.after) new__ctx.after.call(this, ctx);
  }
}
export const update__ctx = new__update__ctx();