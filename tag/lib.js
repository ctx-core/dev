import {assign,keys,prototypeSmash} from "ctx-core/object/lib";
import closest from "closest"
import parseUri from "parseUri";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/tag/lib";
export function tag$assign__opts(tag, ...rest) {
  assign(tag.opts, prototypeSmash(tag.opts), ...rest);
  return assign(tag, tag.opts);
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
export function link$onclick(e) {
  const $a = closest(e.target, "a", true);
  log(`${logPrefix}|link$onclick`);
  e.preventDefault();
  riot.route(parseUri($a.href).path);
}