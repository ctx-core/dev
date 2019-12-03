import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/dom'
export function offset(el) {
	log(`${logPrefix}|offset`)
	let top = 0
	let left = 0
	do {
		top += el.offsetTop || 0
		left += el.offsetLeft || 0
		el = el.offsetParent
	} while (el)
	return { top, left }
}
/**
 * Is the HTMLElement hidden?
 * @param {HTMLElement} el
 * @returns {boolean} true if `el` is hidden
 */
export function is_hidden(el) {
	return !(el.offsetParent)
}
/**
 * Is the HTMLElement visible?
 * @param {HTMLElement} el
 * @returns {boolean} true if `el` is visible
 */
export function is_visible(el) {
	return !!(el.offsetParent)
}
/**
 * Returns the `[left, top]` offset position of the given el
 * @param {HTMLElement} el
 * @returns {[number, number]}
 */
export function _xy__offset(el) {
	let left = el.offsetLeft
	let top = el.offsetTop
	while (el = el.offsetParent) {
		left += el.offsetLeft
		top += el.offsetTop
	}
	return [left, top]
}
