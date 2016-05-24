import {assign,clone,keys} from "ctx-core/object/lib";
import {string$url$anchor} from "ctx-core/string/lib";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dom/lib";
export function dom$(selector, ctx) {
  return (ctx || document).querySelector(selector)
}
export function dom$$(selector, ctx) {
  return (ctx || document).querySelectorAll(selector);
}
export function dom$hidden(el) {
  return !(el.offsetParent);
}
export function dom$visible(el) {
  return !!(el.offsetParent);
}
export function assign__url$anchor(ctx, ...rest) {
  log(`${logPrefix}|assign__url$anchor`);
  return assign(ctx, fn$url$anchor(), ...rest);
}
export function fn$url$anchor(transform$ctx) {
  log(`${logPrefix}|fn$url$anchor`);
  transform$ctx = assign({
    ctx_row_index: (value, key) => parseFloat(value)
  }, transform$ctx);
  const string$url$anchor$ = string$url$anchor(window.location.href)
      , string$url$anchor$decodeURIComponent = decodeURIComponent(string$url$anchor$);
  let anchor$ctx = {};
  if (string$url$anchor$decodeURIComponent) {
    anchor$ctx = string$url$anchor$decodeURIComponent
      .split("&")
      .map(decodeURIComponent)
      .map(uriComponent => uriComponent.split("="))
      .reduce(
        (memo, uriPart$$) => {
          const key = uriPart$$[0]
              , value = uriPart$$[1]
              , transform = transform$ctx[key]
              , value_1 = transform ? transform(value, key) : value;
          memo[key] = value_1;
          return memo;
        }, {}
      );
  }
  return anchor$ctx;
}
export function url$anchor$assign() {
  log(`${logPrefix}|url$anchor$assign`);
  let ctx = assign__url$anchor({}, fn$url$anchor(), ...arguments);
  const ctx$location$hash = keys(ctx)
        .map(
          key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(ctx[key])}`)
        .join("&");
  window.location.hash = ctx$location$hash;
  return ctx;
}