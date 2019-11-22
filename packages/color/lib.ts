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
export function _str__hex__color__rgb__comma_delim(hex) {
	if (hex.length === 3) {
		hex = hex.replace(/(.)/g, (_$0, $1) => $1 + $1)
	}
	const a1__hex = hex.match(/.{1,2}/g)
	let a1__rgb__hex = []
	for (let i = 0; i < a1__hex.length; i++) {
		a1__rgb__hex.push(_int__hex(a1__hex[i]))
	}
	return a1__rgb__hex.join(',')
}
type Opts___a1__color__rgb__phi__hsv = {
	length: number,
	hsv: (number|string)[]
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
export function _a1__color__rgb__phi__hsv(opts: Opts___a1__color__rgb__phi__hsv) {
	const {
		length,
		hsv,
	} = opts
	const [s, v] = hsv.slice(1)
	const colors = []
	const inverse__PHI = 1 / PHI
	let n = length
	const h_float = parseFloat(hsv[0] as string)
	let h = isNaN(h_float)
					? Math.random()
					: h_float
	while (n) {
		h += inverse__PHI
		h = h - floor(h)
		colors.push(_a1__color__rgb__from__a1__color__hsv([h, s, v]))
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
export function _a1__color__rgb__from__a1__color__hsv(a1__color__hsv) {
	const [h, s, v] = a1__color__hsv
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
 * Inverted color for a1__color__rgb as a1__color__rgb
 * @param a1__color__rgb
 * @returns {a1__color__rgb}
 */
export function invert__a1__color__rgb(a1__color__rgb) {
	const a1__color__rgb__invert = a1__color__rgb.slice()
	a1__color__rgb__invert[0] = 255 - a1__color__rgb[0]
	a1__color__rgb__invert[1] = 255 - a1__color__rgb[1]
	a1__color__rgb__invert[2] = 255 - a1__color__rgb[2]
	return a1__color__rgb__invert
}
