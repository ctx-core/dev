import {assign,clone,entries} from "ctx-core/object/lib";
import {registerElement} from "ctx-core/dom/lib";
import closest from "closest"
import parseUri from "parseUri";
import {navigate} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/tag/lib";
export function tag__assign(tag, ...tag_overrides$$) {
  log(`${logPrefix}|tag__assign`, tag);
  let opts = tag.opts
    , ctx = opts.ctx;
  const tag_overrides = clone(...tag_overrides$$)
      , registerElement__tag_overrides = tag_overrides.registerElement || [];
  tag_overrides.registerElement = [].concat(...registerElement__tag_overrides);
  tag_overrides.registerElement.push(tag.root.tagName);
  assign(tag, {
    ctx: ctx,
    update__ctx: update__ctx.bind(tag),
    schedule__update__ctx: schedule__update__ctx.bind(tag),
    onclick__navigate: new__onclick__nagivate(ctx).bind(tag),
    onclick__outbound: new__onclick__outbound(ctx).bind(tag)
  }, tag_overrides);
  tag_overrides.registerElement.forEach(
    element =>
      registerElement(element));
  return tag;
}
export function new__onclick__outbound(ctx) {
  const tag$name = ctx.tag$name || "a"
      , href$key = ctx.href$key || "href";
  return (e) => {
    log(`${logPrefix}|onclick__outbound`);
    e.preventDefault();
    const dom$a = closest(e.target, tag$name, true);
    window.location.href = dom$a[href$key];
  };
}
export function new__onclick__nagivate(ctx) {
  const tag$name = ctx.tag$name || "a"
      , href$key = ctx.href$key || "href";
  return (e) => {
    const $a = closest(e.target, tag$name, true);
    log(`${logPrefix}|onclick__navigate`);
    if (e.preventDefault) e.preventDefault();
    const link$uri = parseUri($a[href$key])
        , link$uri$query = link$uri.query
        , link$uri$path = link$uri.path
        , query = link$uri$query ? `?${link$uri$query}` : "";
    navigate(ctx, `${link$uri$path}${query}`);
    return false;
  };
}
export function schedule__update__ctx(timeout=0) {
  log(`${logPrefix}|schedule__update__ctx`);
  const tag = this;
  setTimeout(() => tag.update__ctx(), timeout);
}
export function new__update__ctx(new__ctx={}) {
  log(`${logPrefix}|new__update__ctx`);
  return function update() {
    log(`${logPrefix}|new__update__ctx|update`, this.root);
    const tag = this;
    let ctx = assign(tag.ctx, ...arguments);
    assign(tag, {ctx: ctx});
    if (new__ctx.before) new__ctx.before.call(tag, ctx);
    tag.update();
    if (new__ctx.after) new__ctx.after.call(tag, ctx);
  }
}
export const update__ctx = new__update__ctx();