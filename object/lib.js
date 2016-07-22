/**
 * @module ctx-core/object/lib
 */
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/object/lib";
/**
 * @typedef {Object} ctx
 */
/**
 * Assigned to the ctx using {@link module:ctx-core/object/lib~assign}
 * @typedef {module:ctx-core/object/lib~ctx} assign$ctx
 */
/**
 * Assigns assign$ctx to ctx.
 * @function
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/object/lib~assign$ctx} assign$ctx - Assigned to ctx
 * @external Object.assign
 */
export const assign = Object.assign.bind(Object);
/**
 * Object keys
 * @function
 * @external Object.keys
 */
export const keys = Object.keys.bind(Object);
/**
 * Object values
 * @function
 * @external Object.values
 */
export const values = Object.values.bind(Object);
/**
 * Assign only if ctx is not null
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function assign$unless__null(ctx) {
  return (ctx == null) ? ctx : assign(...arguments);
}
/**
 * Assigns assign$ctx to a new ctx.
 * @param {...module:ctx-core/object/lib~assign$ctx} assign$ctx - Assigned to cloned ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function clone() {
  return assign({}, ...arguments);
}
/**
 * Ensures that the keys in ctx$rest are added to ctx only if the key is not defined on ctx (== null).
 * The order of precedence is from left to right.
 * @param ctx
 * @param ctx$rest$$
 * @example
 * ctx = {baz: 99};
 * ensure(ctx, {foo: 1, baz: 4}, {foo: 2, bar: 3}); // {baz:99, foo: 1, bar: 3}
 */
export function ensure(ctx, ...ctx$rest$$) {
  ctx$rest$$.forEach(
    ctx$rest => {
      keys(ctx$rest||{}).forEach(
        key => {
          if (ctx[key] == null) {
            ctx[key] = ctx$rest[key];
          }
        }) });
  return ctx;
}
/**
 * New ctx with only pick$keys.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...pick$keys} pick$keys - Keys to pick from ctx.
 * @param {module:ctx-core/object/lib~ctx} ctx
 */
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
export function prototypeSmash(obj) {
  return assign(...(Array.from([{}]).concat(Object.getPrototypeOf(obj), obj)));
}
/**
 * Ensure ctx[key] is present (or call refresh$ctx.init). Then call refresh$ctx.refresh.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {module:ctx-core/object/lib~ctx} refresh$ctx
 * @returns {*} The value of the ctx[key]
 */
export function ensure__refresh(ctx, ...refresh$ctx$$) {
  log(`${logPrefix}|ensure__refresh`);
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