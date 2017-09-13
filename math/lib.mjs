import {last} from 'ctx-core/array/lib'
import {log,debug} from 'ctx-core/logger/lib'
/**
 * Degrees to Radians
 * {number} degrees
 * @returns {number} radians
 */
export function $rad__deg(deg) {
  return deg * (Math.PI/180.0)
}
/**
 * Radians to Degrees
 * @param {number} radians
 * @returns {number} degrees
 */
export function $deg__rad(rad) {
  return rad * (180.0/Math.PI)
}
/**
 * Sum of the numerators
 * @param {number} numerators
 * @returns {number}
 */
export function sum(...numerators) {
  return numerators.reduce((a, b) => a + b)
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
export function segment$points__eqidistant(ctx) {
  const { segment$count = 1
        , range = []} = ctx
      , low = range[0] || 0
      , high = last(range) || 1
      , step = 1.0 * (high - low) / segment$count
  let segment$points = [low]
    , i = 0
    , current__segment$boundary = low
  while (i < segment$count) {
    i++
    current__segment$boundary += step
    segment$points.push(current__segment$boundary)
  }
  return segment$points
}
/**
 * Returns the index of the segment
 * @param value
 * @param segment$points
 * @returns {number}
 */
export function index__segment(value, segment$points) {
  const i__end = segment$points.length
  for (let i=0; i < i__end; i++) {
    const begin__segment$point = segment$points[i]
        , end__segment$point = segment$points[i+1]
    if (
      value >= begin__segment$point
      && value <= end__segment$point) {
      return i
    }
  }
  return -1
}