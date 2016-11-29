/**
 * @module ctx-core/functional/lib
 * @see {@link http://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/}
 */
import {assign} from 'ctx-core/object/lib'
import ramda from 'ramda'
export * from 'ramda'
import {log,debug} from 'ctx-core/logger/lib'
const {curry} = ramda
    , logPrefix = 'ctx-core/functional/lib'
/**
 * map :: Monad m => (a -> b) -> m a -> m b
 */
export const map = curry((fn, m) => {
  return m.map(fn)
})
/**
 * chain :: Monad m => (a -> m b) -> m a -> m b
 */
export const chain = curry((fn, m) => {
  return m.chain(fn)
})
/**
 * ap :: Monad m => m (a -> b) -> m a -> m b
 */
export const ap = curry((mf, m) => { // mf, not fn, because this is a wrapped function
  return mf.ap(m)
})
/**
 * orElse :: Monad m => m a -> a -> m a
 */
export const orElse = curry((val, m) => {
  return m.orElse(val)
})
export function $maybe(val) {
  if (!this.constructor) return new $maybe(val)
  this.__value = val
}
/**
 * Returned by module:ctx-core/functional/lib~$maybe
 * @typedef maybe
 * @property {module:ctx-core/functional/lib#isNothing__maybe} isNothing
 * @property {module:ctx-core/functional/lib#map__maybe} map
 * @property {module:ctx-core/functional/lib#join__maybe} join
 * @property {module:ctx-core/functional/lib#chain__maybe} chain
 * @property {module:ctx-core/functional/lib#orElse__maybe} orElse
 * @property {module:ctx-core/functional/lib#ap__maybe} ap
 * @returns {module:ctx-core/functional/lib~$maybe}
 */
assign($maybe.prototype, {
  isNothing: isNothing__maybe,
  map: map__maybe,
  join: join__maybe,
  chain: chain__maybe,
  orElse: orElse__maybe,
  ap: ap__maybe
});
assign($maybe, {
  of: $of__maybe
})
/**
 * Returns a {@link module:ctx-core/functional/lib~maybe}
 * @param val
 * @returns {module:ctx-core/function/lib~$maybe} The $maybe
 */
export function $of__maybe(val) {
  return $maybe(val)
}
/**
 * true if `maybe.__value == null`
 * @param val
 * @returns {module:ctx-core/function/lib~$maybe} The $maybe
 */
export function isNothing__maybe() {
  return this.__value == null
}
/**
 * Maps `this.__value` & return a new {@link module:ctx-core/functional/lib~maybe}
 * @param {module:ctx-core/functional/lib~maybe} f
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export function map__maybe(f) {
  if (this.isNothing()) {
    return $maybe(null)
  }
  return $maybe(f(this.__value))
}
/**
 * Returns `this.map(f).join()`
 * @param {module:ctx-core/functional/lib~maybe} f
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export function chain__maybe(f) {
  return this.map(f).join()
}
/**
 * Returns `this.__value`
 * @returns {*} `this.__value`
 */
export function join__maybe() {
  return this.__value
}
/**
 * If `this.inNothing` return `$maybe(value__default)`
 * @param {*} value__default - `$maybe(value__default)` if `this.isNothing`
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export function orElse__maybe(value__default) {
  if (this.isNothing()) {
    return $maybe(value__default)
  }
  return this
}
/**
 * `maybe.map(this.__value)`
 * @param {module:ctx-core/functional/lib~maybe} maybe
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export function ap__maybe(maybe) {
  return maybe.map(this.__value)
}
/**
 * `$maybe(1)`
 * @returns {module:ctx-core/functional/lib~maybe<1>}
 */
export const $maybe$1 = $maybe(1)
/**
 * m1.map(fn).ap(m2)
 * @param {function} m1
 * @param {module:ctx-core/functional/lib~maybe} m1 - subject `maybe`
 * @param {module:ctx-core/functional/lib~maybe} m2 - applied `maybe`
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export const liftA2 = curry(function(fn, m1, m2) {
  return m1.map(fn).ap(m2)
})