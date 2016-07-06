import {array$concat$$} from "ctx-core/array/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/object/lib";
export const assign = Object.assign.bind(Object);
export const keys = Object.keys.bind(Object);
export const values = Object.values.bind(Object);
export function assign$null_guard(ctx) {
  return (ctx == null) ? ctx : assign(...arguments);
}
export function clone() {
  return assign({}, ...arguments);
}
export function pick(ctx, ...key$rest$$) {
  log(`${logPrefix}|pick`);
  return key$rest$$.reduce(
    (memo, key) => {
      if (ctx.hasOwnProperty(key)) memo[key] = ctx[key];
      return memo;
    }, {});
}
export function some(obj, fn) {
  log(`${logPrefix}|some`);
  return keys(obj).some(
    key => fn(obj[key], key)
  );
}
export function assign__keys$public(ctx, ...ctx$rest$$) {
  const ctx$rest = clone(...ctx$rest$$);
  assign(ctx, ctx$rest);
  let keys$public = ctx.keys$public;
  if (!keys$public) {
    ctx.keys$public = keys$public = [];
  }
  keys(ctx$rest).forEach(
    key => {
      if (keys$public.indexOf(key) === -1) keys$public.push(key);
    });
  return ctx;
}
export function pick$keys$public() {
  log(`${logPrefix}|pick$keys$public`);
  const ctx = assign(...arguments);
  return pick(ctx, ...(ctx.keys$public || []));
}
export function prototypeSmash(obj) {
  return assign(...(array$concat$$([{}], Object.getPrototypeOf(obj), obj)));
}