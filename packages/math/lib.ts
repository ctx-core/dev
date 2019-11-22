import { _last } from '@ctx-core/array'
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
 * @param {number} rad
 * @returns {number} degrees
 */
export function _deg__rad(rad) {
	return rad * (180.0 / Math.PI)
}
/**
 * Returns the negative of the numeric argument
 * @param {number} number
 * @returns {number}
 */
export function negative(number) {
	return -1 * number
}
/**
 * Adds the arguments
 * @param {...number[]} a1__numerator
 * @returns {number}
 */
export function add(...a1__numerator) {
	let sum = 0
	for (let i = 0; i < a1__numerator.length; i++) {
		sum += a1__numerator[i]
	}
	return sum
}
/**
 * Multiplies the arguments
 * @param {number} a1__numerator
 * @returns {number}
 */
export function mul(product, ...a1__numerator) {
	for (let i = 0; i < a1__numerator.length; i++) {
		product *= a1__numerator[i]
	}
	return product
}
/**
 * Subtracts each in a1__denominator from the value
 * @param {number} value
 * @param {number} a1__denominator
 * @returns {number}
 */
export function sub(value, ...a1__denominator) {
	for (let i = 0; i < a1__denominator.length; i++) {
		value -= a1__denominator[i]
	}
	return value
}
/**
 * Divides each in a1__denominator from the value
 * @param {number} value
 * @param {number} a1__denominator
 * @returns {number}
 */
export function div(value, ...a1__denominator) {
	for (let i = 0; i < a1__denominator.length; i++) {
		value /= a1__denominator[i]
	}
	return value
}
/**
 * Sum of the numerators
 * @param {number} numerators
 * @returns {number}
 */
export const _sum = add
export const sum = _sum
/**
 * Returns the sum of the values mapped by _numerator
 * @param {number=} a1
 * @param {function(number)} _numerator
 * @returns {number}
 */
export function _sum__fn(a1, _numerator) {
	let sum__fn = 0
	if (!a1) return sum__fn
	for (let i = 0; i < a1.length; i++) {
		sum__fn += _numerator(a1[i])
	}
	return sum__fn
}
/**
 * Returns the sum of the items in a1__numerator, adding 0 if an item is falsy.
 * @param {number[]} a1__numerator
 * @returns {number}
 */
export function _sum__numerator__or__0(a1__numerator) {
	return (
		_sum__fn(
			a1__numerator,
			numerator => numerator || 0)
	)
}
/**
 * Averages the items in in a1
 * @param {number[]} a1
 * @param {function(number): number} _numerator
 * @returns {number}
 */
export function _avg__fn(a1, _numerator) {
	const sum__fn = _sum__fn(a1, _numerator)
	return sum__fn / a1.length
}
/**
 * Averages the items in in a1, adding 0 if the item is falsy
 * @param {number[]} a1__numerator
 * @returns {number}
 */
export function _avg__numerator__or__0(a1__numerator) {
	return (
		_avg__fn(
			a1__numerator,
			numerator => numerator || 0)
	)
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
 * @param ctx
 * @param {int} ctx.segment$count - The number of segments in the return value (count of segment boundaries is `ctx.segment$count + 1`)
 * @param {array.<number>} ctx.range - sorted list of the range of values. `ctx.range[0]` - low, `_last(ctx.range)` - high
 * @returns {array.<number>}
 */
export function _a1__point__segment__equidistant(ctx) {
	const {
		length = 1,
		range = [],
	} = ctx
	const low = range[0] || 0
	const high = _last(range) || 1
	const step = 1.0 * (high - low) / length
	let a1__point__segment__equidistant = [low]
	let i = 0
	let boundary__current__segment = low
	while (i < length) {
		i++
		boundary__current__segment += step
		a1__point__segment__equidistant.push(boundary__current__segment)
	}
	return a1__point__segment__equidistant
}
/**
 * Returns the index of the segment
 * @param value
 * @param {[]} a1__point
 * @returns {number}
 */
export function index__point__segment(value, a1__point) {
	const { length } = a1__point
	for (let i = 0; i < length; i++) {
		const point__begin = a1__point[i]
		const point__end = a1__point[i + 1]
		if (
			value >= point__begin
			&& value <= point__end
		) return i
	}
	return -1
}
