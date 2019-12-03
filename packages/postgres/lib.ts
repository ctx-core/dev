import { map } from '@ctx-core/array'
export function _a1__named_param(a1__param) {
	return (
		map(
			a1__param,
			(_, i) => `$${i+1}`
		)
	)
}
/**
 * Set Add named param. Returns index of value, which is already in a1__param or pushed onto a1__param.
 * @param a1__param
 * @param value
 * @returns {*}
 */
export function sadd__named_param(a1__param, value) {
	const indexOf__ = a1__param.indexOf(value)
	if (indexOf__ > -1) {
		return indexOf__
	} else {
		a1__param.push(value)
		const index__append = a1__param.length
		return index__append
	}
}
export function _sql__set__a1__param(a1__param, a1__named_param) {
  return (
  	map(
  		a1__param,
			(param, i) => `${param}=${a1__named_param[i]}`
		).join(', ')
	)
}