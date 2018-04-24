import {_int__hex} from 'ctx-core/number/lib.mjs'
import {PHI} from 'ctx-core/math/lib.mjs'
const {floor} = Math
/**
 * Convert hex to a comma-delimited rgb string
 * @param hex
 * @returns {string}
 * @example
 * _rgb__hex('ABC') // '170,187,204'
 * _rgb__hex('123456') // '18,52,86'
 */
export function _rgb__hex(hex) {
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, ($0, $1) => $1+$1)
  }
  const array__hex = hex.match(/.{1,2}/g)
  let array__rgb__hex = []
  for (let i=0; i < array__hex.length; i++) {
    array__rgb__hex.push(_int__hex(array__hex[i]))
  }
  return array__rgb__hex.join(',')
}
/**
 * Returns an array of colors with a given sv (`[saturation, value]`)
 * with h (hue) seperated by `1/PHI`
 * @param opts
 * @param {Integer} opts.length
 * @param {Array} opts.sv
 * @returns {Array}
 * @see {@link https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/}
 */
export function __rgb__PHI__hsv(opts={}) {
  const { length
        , hsv} = opts
      , [s, v] = hsv.slice(1)
      , colors = []
      , inverse__PHI = 1 / PHI
  let n = length
    , h = isNaN(parseFloat(hsv[0]))
          ? Math.random()
          : hsv[0]
  while (n) {
    h += inverse__PHI
    h = h - floor(h)
    colors.push(_rgb__hsv(h, s, v))
    n--
  }
  return colors
}

/**
 * Returns a rgb array value from the given `(h,s,v)` (Hue, Saturation, Value)
 * @param {Integer} h - Hue
 * @param {Integer} s - Saturation
 * @param {Integer} v - Value
 * @returns {[red,green,blue]}
 * @see {@link http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB}
 */
export function _rgb__hsv(h, s, v) {
  const h_i = floor(h*6)
      , f = h*6 - h_i
      , p = v * (1 - s)
      , q = v * (1 - f*s)
      , t = v * (1 - (1 - f) * s)
  let r, g, b
  if (h_i===0) {
    [r, g, b] = [v, t, p]
  } else if (h_i===1) {
    [r, g, b] = [q, v, p]
  } else if (h_i===2) {
    [r, g, b] = [p, v, t]
  } else if (h_i===3) {
    [r, g, b] = [p, q, v]
  } else if (h_i===4) {
    [r, g, b] = [t, p, v]
  } else if (h_i===5) {
    [r, g, b] = [v, p, q]
  }
  return [floor(r*256), floor(g*256), floor(b*256)]
}