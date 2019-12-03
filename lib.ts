/**
 * @module @ctx-core/functional/lib
 * @see {@link http://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/}
 */
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
		return (function resolver(...arg_a1__resolver:any[]) {
			const memory = Array.prototype.slice.call(arg_a1__resolver)
			return function (...arg_a1:any[]) {
				const local = memory.slice()
				fn__append(local, arg_a1)
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
