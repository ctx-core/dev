import { falsy } from '@ctx-core/function'
import { I__ } from '@ctx-core/combinators'
import { _present__a1 } from '@ctx-core/array'
export type h1__filter = { [key:string]:boolean }
/**
 * Returns a h1__filter with the values filtered by `fn`.
 * @param {{}} h1
 * @param {function}[fn]
 * @returns {h1__filter}
 */
export function _h1__filter(h1:falsy|any, fn = I__):falsy|h1__filter {
	if (!h1) return
	const h1__filter = {}
	for (let key in h1) {
		h1__filter[key] = !!(fn(h1[key], key, h1))
	}
	return h1__filter
}
/**
 * Returns a function that calls _h1__filter with fn
 * @param {function}[fn]
 * @returns {function<{{}}>}
 */
export function _fn__h1__filter(fn = I__) {
	return h1=>_h1__filter(h1, fn)
}
/**
 * Returns a h1__filter where the value is a
 * boolean of whether the array has items present
 */
export const _h1__present__a1 = _fn__h1__filter(_present__a1)
