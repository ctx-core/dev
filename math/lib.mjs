import {last} from 'ctx-core/array/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const {sqrt} = Math
export const PHI = (1 + sqrt(5)) / 2
/**
 * Degrees to Radians
 * {number} degrees
 * @returns {number} radians
 */
export function _rad__deg(deg) {
	return deg * (Math.PI/180.0)
}
/**
 * Radians to Degrees
 * @param {number} radians
 * @returns {number} degrees
 */
export function _deg__rad(rad) {
	return rad * (180.0/Math.PI)
}
/**
 * Sum of the numerators
 * @param {number} numerators
 * @returns {number}
 */
export function sum(...numerators) {
	let sum = 0
	for (let i=0; i < numerators.length; i++) {
		sum += numerators[i]
	}
	return sum
}
export function nansum(...numerators) {
	let sum = 0
	for (let i=0; i < numerators.length; i++) {
		sum += (numerators[i] || 0)
	}
	return sum
}
/**
 * Average of the numerators
 * @param {number} numerators
 * @returns {number}
 */
export function avg(...numerators) {
	return sum(...numerators) / numerators.length
}
/**
 * Returns an array of eqidistant segment boundaries from the count & range
 * @param {module:ctx-core/object/lib~ctx} - ctx
 * @param {int} ctx.segment$count - The number of segments in the return value (count of segment boundaries is `ctx.segment$count + 1`)
 * @param {array.<number>} ctx.range - sorted list of the range of values. `ctx.range[0]` - low, `last(ctx.range)` - high
 * @returns {array.<number>}
 */
export function _points__segment__eqidistant(ctx) {
	const { length = 1
				, range = []
				} = ctx
			, low = range[0] || 0
			, high = last(range) || 1
			, step = 1.0 * (high - low) / length
	let points__segment__eqidistant = [low]
		, i = 0
		, boundary__current__segment = low
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
 * @param points
 * @returns {number}
 */
export function index__point__segment(value, points) {
	const i__end = points.length
	for (let i=0; i < i__end; i++) {
		const point__begin = points[i]
				, point__end = points[i+1]
		if (
			value >= point__begin
			&& value <= point__end) {
			return i
		}
	}
	return -1
}