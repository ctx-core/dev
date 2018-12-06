import './string.includes.polyfill'
import { log, debug } from '@ctx-core/logger/lib.mjs'
export const mdash = '—'
export const uarr = '↑'
export const darr = '↓'
export const larr = '←'
export const rarr = '→'
export const harr = '↔'
export const heavy_multiplication_x = '✖'
export const multiplication_x = '✕'
export const multiplication_sign = '×'
export const sum = '∑'
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
export function titleCase(str) {
	const titleCase__ =
		str == null
		? ''
		: str.toString().replace(
			/\w\S*/g,
			txt =>
				txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
	return titleCase__
}
export const titleCase__string = titleCase