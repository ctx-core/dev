import { map } from '@ctx-core/array/lib.js'
export function _ARR__named_param(ARR__param) {
	return (
		map(
			ARR__param,
			(_, i) => `$${i+1}`
		)
	)
}
export const _ARR__named_param__pg = _ARR__named_param
/**
 * Set Add named param. Returns index of value, which is already in ARR__param or pushed onto ARR__param.
 * @param ARR__param
 * @param value
 * @returns {*}
 */
export function sadd__named_param(ARR__param, value) {
	const indexOf__ = ARR__param.indexOf(value)
	if (indexOf__ > -1) {
		return indexOf__
	} else {
		ARR__param.push(value)
		const index__append = ARR__param.length
		return index__append
	}
}
export function _sql__set__ARR__param(ARR__param, ARR__named_param) {
  return (
  	map(
  		ARR__param,
			(param, i) => `${param}=${ARR__named_param[i]}`
		).join(', ')
	)
}