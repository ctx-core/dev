/**
 * @module @ctx-core/functional/lib
 * @see {@link http://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/}
 */
import { assign } from '@ctx-core/object/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/functional/lib.js'
export const curry =
	_fn__curry((local, args) => Array.prototype.push.apply(local, args))
export const flip =
	_fn__curry((local, args) => Array.prototype.unshift.apply(local, args))
export const curry__flip = flip
/**
 *
 * @param fn__append
 * @returns {function(*=): *}
 * @private
 * @see {@link https://medium.com/@kevincennis/currying-in-javascript-c66080543528}
 */
export function _fn__curry(fn__append) {
	return fn => {
		const arity = fn.length
		return (function resolver() {
			const memory = Array.prototype.slice.call(arguments)
			return function () {
				const local = memory.slice()
				fn__append(local, arguments)
				const next = local.length >= arity ? fn : resolver
				return next.apply(null, local)
			}
		}())
	}
}
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
export function _maybe(val) {
	if (!this || !this.constructor) return new _maybe(val)
	this.__value = val
}
/**
 * Returned by module:ctx-core/functional/lib~_maybe
 * @typedef maybe
 * @property {module:ctx-core/functional/lib#isNothing__maybe} isNothing
 * @property {module:ctx-core/functional/lib#map__maybe} map
 * @property {module:ctx-core/functional/lib#join__maybe} join
 * @property {module:ctx-core/functional/lib#chain__maybe} chain
 * @property {module:ctx-core/functional/lib#orElse__maybe} orElse
 * @property {module:ctx-core/functional/lib#ap__maybe} ap
 * @returns {module:ctx-core/functional/lib~_maybe}
 */
assign(_maybe.prototype, {
	isNothing: isNothing__maybe,
	map: map__maybe,
	join: join__maybe,
	chain: chain__maybe,
	orElse: orElse__maybe,
	ap: ap__maybe
})
assign(_maybe, {
	of: _of__maybe
})
/**
 * Returns a {@link module:ctx-core/functional/lib~maybe}
 * @param val
 * @returns {module:ctx-core/function/lib~_maybe} The _maybe
 */
export function _of__maybe(val) {
	return _maybe(val)
}
/**
 * true if `maybe.__value == null`
 * @param val
 * @returns {module:ctx-core/function/lib~_maybe} The _maybe
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
		return _maybe(null)
	}
	return _maybe(f(this.__value))
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
 * If `this.inNothing` return `_maybe(value__default)`
 * @param {*} value__default - `_maybe(value__default)` if `this.isNothing`
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export function orElse__maybe(value__default) {
	if (this.isNothing()) {
		return _maybe(value__default)
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
 * `_maybe(1)`
 * @returns {module:ctx-core/functional/lib~maybe<1>}
 */
export const _maybe__1 = _maybe(1)
/**
 * m1.map(fn).ap(m2)
 * @param {function} m1
 * @param {module:ctx-core/functional/lib~maybe} m1 - subject `maybe`
 * @param {module:ctx-core/functional/lib~maybe} m2 - applied `maybe`
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export const liftA2 = curry((fn, m1, m2) => {
	return m1.map(fn).ap(m2)
})