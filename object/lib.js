/**
 * @module ctx-core/object/lib
 */
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/object/lib'
/**
 * @typedef {Object} ctx
 */
/**
 * Assigned to the ctx using {@link module:ctx-core/object/lib~assign}
 * @typedef {module:ctx-core/object/lib~ctx} assign$ctx
 */
/**
 * Assigns assign$ctx to ctx.
 * @function assign
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...module:ctx-core/object/lib~assign$ctx} assign$ctx - Assigned to ctx
 */
export const assign = Object.assign.bind(Object)
/**
 * Object keys
 * @function keys
 */
export const keys = Object.keys.bind(Object)
/**
 * Object values
 * @function values
 */
export const values = Object.values.bind(Object)
/**
 * Generator function allowing iteration over key/value pairs of a `ctx`.
 * @param {object} obj - The object to iterate on with key/value pairs.
 * @example
 * for (let [key, value] of entries(myObj)) {
 *   // code
 * }
 * @see {@link https://esdiscuss.org/topic/es6-iteration-over-object-values}
 */
export function *entries(obj) {
  for (let key of keys(obj)) {
    yield [key, obj[key]]
  }
}
export function defaults(ctx, ...rest$ctx$$) {
  log(`${logPrefix}|`)
  const rest$ctx = clone(...rest$ctx$$)
  for (let [key, value] of entries(ctx)) {
    if (value == null) ctx[key] = rest$ctx[key]
  }
  return ctx
}
/**
 * Map function used to map entries.
 * @function map__entries
 * @param {*} value - The value of the entry.
 * @param {string} key - The key of the entry.
 * @returns The mapped array of the entries transformed by map__entries.
 */
/**
 * Returns a `map` of the `(value, key)` to `fn`
 * @param obj
 * @param {function} fn - Mapping function that returns the transformed `value`/`key`.
 * @returns {Array} The return values of `fn`
 * @example
 * map__entries({foo: 'bar', baz: 'quux'}, (value, key) => `${value}!${key}`)
 * // ['foo!bar', 'baz!quux']
 */
export function map__entries(obj, fn) {
  let rv = []
  for (let [key, value] of entries(obj)) {
    rv.push(fn(value, key))
  }
  return rv
}
/**
 * Assign only if ctx is not null
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function assign$unless__null(ctx) {
  return (ctx == null) ? ctx : assign(...arguments)
}
/**
 * Assigns `assign$ctx` to a new `ctx`.
 * @param {...module:ctx-core/object/lib~assign$ctx} assign$ctx - Assigned to cloned `ctx`
 * @returns {module:ctx-core/object/lib~ctx} ctx
 */
export function clone() {
  return assign({}, ...arguments)
}
/**
 * Ensures that the keys in `ctx$rest` are added to ctx only if the key is not defined on `ctx` (== null).
 * The order of precedence is from left to right.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...ctx$rest} ctx$rest - Rest to `ensure` on `ctx`.
 * @returns {module:ctx-core/object/lib~ctx}
 * @example
 * ctx = {baz: 99}
 * ensure(ctx, {foo: 1, baz: 4}, {foo: 2, bar: 3}) // {baz:99, foo: 1, bar: 3}
 */
export function ensure(ctx, ...ctx$rest$$) {
  ctx$rest$$.forEach(
    ctx$rest => {
      keys(ctx$rest||{}).forEach(
        key => {
          if (ctx[key] == null) {
            ctx[key] = ctx$rest[key]
          }
        }) })
  return ctx
}
/**
 * New `ctx` with only `pick$keys`.
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {...string} pick$key - Key to pick from ctx.
 * @param {module:ctx-core/object/lib~ctx} ctx
 */
export function pick(ctx, ...pick$key$$) {
  log(`${logPrefix}|pick`)
  return pick$key$$.reduce(
    (memo, key) => {
      if (ctx.hasOwnProperty(key)) memo[key] = ctx[key]
      return memo
    }, {})
}
/**
 * Compare function used by some to determine if some of the calls to some__compare(value, key) match.
 * @function some__compare
 * @param {*} value - The value of the current key/value iteration.
 * @param {string} key - The key of the current key/value iteration.
 * @returns {boolean} true if there's a match. false if there's no match.
 */
/**
 * Returns true when some of the key/value pairs cause the fn to be truthy.
 * @param {object} obj - The object on which to run the some__compare(value, key)
 * @param {some__compare} some__compare - The compare function receiving compare(value, key)
 * @returns {boolean} True when at least one of the calls to some__compare(value, key) are truthy
 * @example
 * some({foo: 9, bar: 10}, (value, key) => value === 10) // returns true
 * some({baz: 11, quux: 12}, (value, key) => value === 10) // returns false
 */
export function some(obj, some__compare) {
  log(`${logPrefix}|some`)
  return keys(obj).some(
    key => some__compare(obj[key], key)
  )
}
/**
 * `ensure` `ctx[key]` is present or call `refresh$ctx.init`. Then call `refresh$ctx.refresh`.
 *
 * - if `!ctx[key]` `refresh$ctx.ensure(ctx)`
 * - `refresh$ctx.refresh(ctx, ctx[key])`
 * @param {module:ctx-core/object/lib~ctx} ctx
 * @param {module:ctx-core/object/lib~ctx} refresh$ctx
 * @param {function} refresh$ctx.ensure - Called when `ctx[key]` is falsy.
 * `ctx[key]` is set to the return value.
 * @param {function} refresh$ctx.refresh - Called with the ensured value of `ctx[key]`.
 * @returns {*} The value of the ctx[key]
 */
export function ensure__refresh(ctx, ...refresh$ctx$$) {
  log(`${logPrefix}|ensure__refresh`)
  const refresh$ctx = clone(...refresh$ctx$$)
      , {key,
        ensure,
        refresh} = refresh$ctx
  if (!ctx[key]) {
    ctx[key] = ensure(ctx)
  }
  refresh(ctx, ctx[key])
  return ctx[key]
}