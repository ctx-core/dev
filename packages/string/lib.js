import './string.includes.polyfill'
export function _acronym(string) {
	return string && string.match(/\b(\w)/g).join('')
}
export function isString(obj) {
	return !!(obj === '' || (obj && obj.charCodeAt && obj.substr))
}
export function lPad(str, padString, length) {
	let str2 = str.toString()
	while (str2.length < length)
		str2 = padString + str2
	return str2
}
export function rPad(str, padString, length) {
	let str2 = str.toString()
	while (str2.length < length)
		str2 = str2 + padString
	return str2
}
export function splice__string(str, idx, rem, s) {
	return (str.slice(0, idx) + (s || '') + str.slice(idx + Math.abs(rem)))
}
export function _title_case(str) {
	const titleCase__ =
		str == null
		? ''
		: str.toString().replace(
			/\w\S*/g,
			txt =>
				txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
	return titleCase__
}
export const titleCase = _title_case
export const toTitleCase = _title_case
export const titleCase__string = titleCase
/**
 * Applies Array#splice semantics on a string.
 * A new string is returned instead rather than mutating the original `str` argument.
 *
 * @param str
 * @param index
 * @param count
 * @param add
 * @returns {*}
 * @see {@link https://stackoverflow.com/a/21350614/142571}
 */
export function splice__str(str, index, count, add) {
	// We cannot pass negative indexes directly to the 2nd slicing operation.
	if (index < 0) {
		index = str.length + index
		if (index < 0) {
			index = 0
		}
	}
	return str.slice(0, index) + (add || '') + str.slice(index + count)
}
