import {array$concat$$} from "ctx-core/array/lib";
import {uuid} from "ctx-core/uuid/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/object/lib";
export const assign = Object.assign.bind(Object);
export const keys = Object.keys.bind(Object);
export const values = Object.values.bind(Object);
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
export function assign__publicKeys(ctx, ...ctx$rest$$) {
  const ctx$rest = clone(...ctx$rest$$);
  assign(ctx, ctx$rest);
  let publicKeys = ctx.publicKeys;
  if (!publicKeys) {
    ctx.publicKeys = publicKeys = [];
  }
  keys(ctx$rest).forEach(
    key => {
      if (publicKeys.indexOf(key) === -1) publicKeys.push(key);
    });
  return ctx;
}
export function pick$publicKeys() {
  log(`${logPrefix}|pick$publicKeys`);
  const ctx = assign(...arguments);
  return pick(ctx, ...(ctx.publicKeys || []));
}
export function prototypeSmash(obj) {
  return assign(...(array$concat$$([{}], Object.getPrototypeOf(obj), obj)));
}
