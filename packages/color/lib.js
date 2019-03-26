import { _int__hex } from '@ctx-core/number'
import { PHI } from '@ctx-core/math'
const { floor } = Math
/**
 * Convert hex to a comma-delimited rgb string
 * @param hex
 * @returns {string}
 * @example
 * _rgb__hex('ABC') // '170,187,204'
 * _rgb__hex('123456') // '18,52,86'
 */
export function _STR__hex__color__rgb__comma_delim(hex) {
	if (hex.length === 3) {
		hex = hex.replace(/(.)/g, ($0, $1) => $1 + $1)
	}
	const ARR__hex = hex.match(/.{1,2}/g)
	let ARR__rgb__hex = []
	for (let i = 0; i < ARR__hex.length; i++) {
		ARR__rgb__hex.push(_int__hex(ARR__hex[i]))
	}
	return ARR__rgb__hex.join(',')
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
export function _ARR__color__rgb__PHI__hsv(opts = {}) {
	const {
		length,
		hsv
	} = opts
	const [s, v] = hsv.slice(1)
	const colors = []
	const inverse__PHI = 1 / PHI
	let n = length
	let h = isNaN(parseFloat(hsv[0]))
					? Math.random()
					: hsv[0]
	while (n) {
		h += inverse__PHI
		h = h - floor(h)
		colors.push(_ARR__color__rgb__FROM__ARR__color__hsv([h, s, v]))
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
export function _ARR__color__rgb__FROM__ARR__color__hsv(ARR__color__hsv) {
	const [h, s, v] = ARR__color__hsv
	const h_i = floor(h * 6)
	const f = h * 6 - h_i
	const p = v * (1 - s)
	const q = v * (1 - f * s)
	const t = v * (1 - (1 - f) * s)
	let r, g, b
	if (h_i === 0) {
		[r, g, b] = [v, t, p]
	} else if (h_i === 1) {
		[r, g, b] = [q, v, p]
	} else if (h_i === 2) {
		[r, g, b] = [p, v, t]
	} else if (h_i === 3) {
		[r, g, b] = [p, q, v]
	} else if (h_i === 4) {
		[r, g, b] = [t, p, v]
	} else if (h_i === 5) {
		[r, g, b] = [v, p, q]
	}
	return [floor(r * 256), floor(g * 256), floor(b * 256)]
}
/**
 * Inverted color for ARR__color__rgb as ARR__color__rgb
 * @param ARR__color__rgb
 * @returns {ARR__color__rgb}
 */
export function invert__ARR__color__rgb(ARR__color__rgb) {
	const ARR__color__rgb__invert = ARR__color__rgb.slice()
	ARR__color__rgb__invert[0] = 255 - ARR__color__rgb[0]
	ARR__color__rgb__invert[1] = 255 - ARR__color__rgb[1]
	ARR__color__rgb__invert[2] = 255 - ARR__color__rgb[2]
	return ARR__color__rgb__invert
}