/**
 * @module ctx-core/object/lib
 */
import {array$concat} from "ctx-core/array/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/object/lib";
/**
 * @typedef {Object} ctx
 */
export const assign = Object.assign.bind(Object);
export const keys = Object.keys.bind(Object);
export const values = Object.values.bind(Object);
export function assign$maybe(ctx) {
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
export function assign__public_keys(ctx, ...ctx$rest$$) {
  const ctx$rest = clone(...ctx$rest$$);
  assign(ctx, ctx$rest);
  let public_keys = ctx.public_keys;
  if (!public_keys) {
    ctx.public_keys = public_keys = [];
  }
  keys(ctx$rest).forEach(
    key => {
      if (public_keys.indexOf(key) === -1) public_keys.push(key);
    });
  return ctx;
}
export function pick__public_keys() {
  log(`${logPrefix}|pick__public_keys`);
  const ctx = assign(...arguments);
  return pick(ctx, ...(ctx.public_keys || []));
}
export function prototypeSmash(obj) {
  return assign(...(array$concat([{}], Object.getPrototypeOf(obj), obj)));
}
export function refresh__key(ctx, ...refresh$ctx$$) {
  log(`${logPrefix}|refresh__key`);
  const refresh$ctx = clone(...refresh$ctx$$)
      , key = refresh$ctx.key
      , init = refresh$ctx.init
      , refresh = refresh$ctx.refresh;
  if (!ctx[key]) {
    ctx[key] = init(ctx);
  }
  refresh(ctx, ctx[key]);
  return ctx[key];
}