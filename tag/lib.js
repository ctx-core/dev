import {assign,clone,keys} from "ctx-core/object/lib";
import {registerElement} from "ctx-core/dom/lib";
import closest from "closest"
import parseUri from "parseUri";
import {route} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/tag/lib";
export function tag__assign(tag, ...new__ctx$$) {
  log(`${logPrefix}|tag__assign`, tag);
  let opts = tag.opts;
  const new__ctx = clone(...new__ctx$$);
  new__ctx.registerElement = [].concat(...new__ctx.registerElement);
  new__ctx.registerElement.push(tag.root.tagName);
  assign(tag, {
    ctx: opts.ctx,
    ctx$update: ctx$update.bind(tag),
    self$update: self$update.bind(tag),
    app__link$onclick: app__link$onclick,
    window__link$onclick: window__link$onclick
  }, new__ctx);
  new__ctx.registerElement.forEach(element => registerElement(element));
  return tag;
}
export function tag$tags__assign__ctx$update(tag, ...ctx$$) {
  log(`${logPrefix}|tag$tags__assign__ctx$update`);
  const ctx = assign(...ctx$$)
      , tags = tag.tags;
  keys(tags).forEach(
    tag$child$key => {
      const tag$child = tag$child$key && tags[tag$child$key];
      return tag$child && tag$child.ctx$update && tag$child.ctx$update(ctx);
    });
}
export function window__link$onclick(e) {
  log(`${logPrefix}|window__link$onclick`);
  e.preventDefault();
  const $a = closest(e.target, "a", true);
  window.location.href = $a.href;
}
export const app__link$onclick = app__link$onclick__fn();
export function app__link$onclick__fn(ctx={}) {
  const tag$name = ctx.tag$name || "a"
      , href$key = ctx.href$key || "href";
  return (e) => {
    const $a = closest(e.target, tag$name, true);
    log(`${logPrefix}|app__link$onclick`);
    e.preventDefault();
    const link$uri = parseUri($a[href$key])
        , link$uri$query = link$uri.query
        , link$uri$path = link$uri.path
        , query = link$uri$query ? `?${link$uri$query}` : "";
    route(ctx, `${link$uri$path}${query}`);
  };
}
export function new__ctx$update(new__ctx={}) {
  log(`${logPrefix}|new__ctx$update`);
  return function ctx$update() {
    log(`${logPrefix}|new__ctx$update|ctx$update`, this.root);
    let ctx = assign(this.ctx, ...arguments);
    assign(this, {ctx: ctx});
    if (new__ctx.before) new__ctx.before.call(this, ctx);
    this.self$update();
    if (new__ctx.after) new__ctx.after.call(this, ctx);
  }
}
export const ctx$update = new__ctx$update();
export function self$update() {
  log(`${logPrefix}|self$update`, this.root);
  this.update();
}