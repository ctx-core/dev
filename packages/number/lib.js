/**
 * number library
 * @module @ctx-core/number/lib
 */
/**
 * @type {number}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number}
 */
export const INT__MAX = 9007199254740991
export const INT__MIN = -9007199254740991
/**
 * Convert hex to int
 * @param {string} hex
 * @returns {Int}
 */
export function _int__hex(hex) {
	return parseInt(hex, 16)
}
/**
 * Convert int to hex
 * @param {Int} rgb
 * @returns {string}
 */
export function _hex__int(rgb) {
	return rgb.toString(16)
}
/**
 * @property {number} power represented as a string
 * @typedef denominations
 * @example
 * {7: 'mn', 10: 'bn', 13: 'tn'}
 */
/**
 * Normalization text for a number
 * @param {number} number
 * @param {module:@ctx-core/number/lib~denominations} denominations
 * @returns {string}
 * @example
 * `$${abbreviate__number(amount, {6: 'mm', 9: 'bn', 12: 'tn'})}`
 */
export function abbreviate__number(number, denominations) {
	const float = parseFloat(number)
	if (!float) return '0'
	const exp10 = Math.floor(Math.log10(float))
	const step__exp10 =
		exp10 >= 0
		? -1
		: 1
	let denomination, i__denomination
	set__denomination()
	const normalized__float =
		denomination
		? float
			/ Math.pow(10, i__denomination)
		: float
	const normalized__fixed =
		normalized__float
			.toFixed(2)
	return `${normalized__fixed}${denomination}`
	function set__denomination() {
		i__denomination = exp10
		while (i__denomination) {
			denomination =
				denominations[i__denomination]
			if (denomination) break
			i__denomination =
				i__denomination
				+ step__exp10
		}
		if (!denomination) denomination = ''
	}
}
export function format__commas(number) {
	return (
		number == null
		? null
		: (
			number
				.toString()
				.replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g,
					'$1,')
		)
	)
}
export function unformat__commas(string) {
	return (
		string == null
		? string
		: (
			string
				.toString()
				.replace(
					/,/g,
					'')
		)
	)
}
export function format__percentage(number) {
	return `${number}%`
}
export function unformat__percentage(percentage) {
	return (
		parseFloat(
			percentage
				.replace(
					/%/g,
					''))
	)
}
export function isNaN__float(number) {
	return (
		isNaN(
			parseFloat(
				number))
	)
}
export function isFloat(number) {
	return !isNaN__float(number)
}
export const isNumber = isFloat
let __sequence = -1
export function increment__sequence() {
	__sequence++
	return __sequence
}
export function _text__number__or__mdash(number) {
	return (
		isNumber(number)
		? `${number}`
		: '—'
	)
}