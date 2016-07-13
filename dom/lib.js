import {assign,keys} from "ctx-core/object/lib";
import {string$url$anchor} from "ctx-core/string/lib";
import dom$classes from "dom-classes";
import {log,debug} from "ctx-core/logger/lib";
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
export function registerElement(element$name) {
  log(`${logPrefix}|registerElement`);
  if (document.registerElement && !element$isRegistered(element$name)) {
    return document.registerElement(...arguments);
  }
}
export function set__class(dom$, ...rest) {
  let ctx;
  if (rest.length === 2) {
    ctx = {};
    ctx[rest[0]] = rest[1];
  } else {
    ctx = rest[0];
  }
  for (let className in ctx) {
    const op = ctx[className] ? "add" : "remove";
    dom$classes[op](dom$, className);
  }
}
export function element$isRegistered(element$name) {
  log(`${logPrefix}|element$isRegistered`);
  return document.createElement(element$name).constructor !== HTMLElement;
}
export function assign__url$anchor(ctx, ...rest) {
  log(`${logPrefix}|assign__url$anchor`);
  return assign(ctx, new__url$anchor(), ...rest);
}
export function new__url$anchor(transform$ctx) {
  log(`${logPrefix}|new__url$anchor`);
  transform$ctx = assign({
    ctx_row_id: (value, key) => parseFloat(value)
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
export function assign__url$anchor() {
  log(`${logPrefix}|assign__url$anchor`);
  let ctx = assign__url$anchor({}, new__url$anchor(), ...arguments);
  const ctx$location$hash = keys(ctx)
        .map(
          key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(ctx[key])}`)
        .join("&");
  window.location.hash = ctx$location$hash;
  return ctx;
}