import { _last } from '@ctx-core/array'
import { log, debug } from '@ctx-core/logger'
const { sqrt } = Math
export const PHI = (1 + sqrt(5)) / 2
/**
 * Degrees to Radians
 * {number} degrees
 * @returns {number} radians
 */
export function _rad__deg(deg) {
	return deg * (Math.PI / 180.0)
}
/**
 * Radians to Degrees
 * @param {number} radians
 * @returns {number} degrees
 */
export function _deg__rad(rad) {
	return rad * (180.0 / Math.PI)
}
export function negative(number) {
  return -1 * number
}
export function add(...a1__numerator) {
	let sum = 0
	for (let i = 0; i < a1__numerator.length; i++) {
		sum += a1__numerator[i]
	}
	return sum
}
export function mul(product, ...a1__numerator) {
	for (let i = 0; i < a1__numerator.length; i++) {
		product *= a1__numerator[i]
	}
	return product
}
export function sub(difference, ...a1__denominator) {
	for (let i = 0; i < a1__denominator.length; i++) {
		difference -= a1__denominator[i]
	}
	return difference
}
export function div(division, ...a1__denominator) {
	for (let i = 0; i < a1__denominator.length; i++) {
		division /= a1__denominator[i]
	}
	return division
}
/**
 * Sum of the numerators
 * @param {number} numerators
 * @returns {number}
 */
export const _sum = add
export const sum = _sum
export function _sum__fn(a1, _numerator) {
	let sum__fn = 0
	if (!a1) return sum__fn
	for (let i = 0; i < a1.length; i++) {
		sum__fn += _numerator(a1[i])
	}
	return sum__fn
}
export function _sum__float__or__0(a1) {
	return _sum__fn(a1, val => val || 0.0)
}
export function _avg__fn(a1, _numerator) {
	const sum__fn = _sum__fn(a1, _numerator)
	return sum__fn / a1.length
}
export function _avg__float__or__0(a1) {
	return _avg__fn(a1, val => val || 0.0)
}
export function nansum(...a1__numerator) {
	let sum = 0
	for (let i = 0; i < a1__numerator.length; i++) {
		sum += (a1__numerator[i] || 0)
	}
	return sum
}
/**
 * Average of the a1__numerator
 * @param {number} a1__numerator
 * @returns {number}
 */
export function avg(...a1__numerator) {
	return sum(...a1__numerator) / a1__numerator.length
}
/**
 * Returns an array of eqidistant segment boundaries from the count & range
 * @param {module:ctx-core/object/lib~ctx} - ctx
 * @param {int} ctx.segment$count - The number of segments in the return value (count of segment boundaries is `ctx.segment$count + 1`)
 * @param {array.<number>} ctx.range - sorted list of the range of values. `ctx.range[0]` - low, `_last(ctx.range)` - high
 * @returns {array.<number>}
 */
export function _points__segment__eqidistant(ctx) {
	const {
		length = 1,
		range = [],
	} = ctx
	const low = range[0] || 0
	const high = _last(range) || 1
	const step = 1.0 * (high - low) / length
	let points__segment__eqidistant = [low]
	let i = 0
	let boundary__current__segment = low
	while (i < length) {
		i++
		boundary__current__segment += step
		points__segment__eqidistant.push(boundary__current__segment)
	}
	return points__segment__eqidistant
}
/**
 * Returns the index of the segment
 * @param value
 * @param a1__point
 * @returns {number}
 */
export function index__point__segment(value, a1__point) {
	const i__end = a1__point.length
	for (let i = 0; i < i__end; i++) {
		const point__begin = a1__point[i]
		const point__end = a1__point[i + 1]
		if (
			value >= point__begin
			&& value <= point__end) {
			return i
		}
	}
	return -1
}
