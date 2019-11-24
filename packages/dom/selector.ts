export function _has__dom() {
	return typeof window === 'object'
}
export const has__dom = _has__dom
export function _no__dom() {
	return typeof window === 'undefined'
}
export const no__dom = _no__dom
export function _if__has__dom(fn) {
	return (...args) => _has__dom() && fn(...args)
}
export function _if__no__dom(fn) {
	return (...args) => _no__dom() && fn(...args)
}
/**
 * The first matching HTMLElement from the selector
 * @param {string} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {HTMLElement} the first HTMLElement matching the selector
 */
export function _dom(selector, parent?:HTMLElement) {
	return (parent || document).querySelector(selector)
}
/**
 * The first matching HTMLElement from the selector
 *
 * - If selector is an object, return selector.
 * @param {string,object} selector - the DOM query selector
 * @param {HTMLElement} parent
 * @returns {HTMLElement} the first HTMLElement matching the selector
 */
export function _dom2(selector, parent?:HTMLElement) {
	if (typeof selector === 'object') return selector
	return _dom(selector, parent)
}
/**
 * All matching HTMLElements from the selector
 * @param {string} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function _a1__dom(selector, parent?) {
	return (parent || document).querySelectorAll(selector)
}
export const __dom = _a1__dom
export const _node_list__dom = __dom
export const _NL__dom = __dom
/**
 * All matching HTMLElements from the selector.
 *
 * - If selector is an object, return selector.
 * @param {string|*} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function __dom2(selector, parent?:HTMLElement) {
	if (typeof selector === 'object') return selector
	return __dom(selector, parent)
}
/**
 * Returns true if it is a DOM node
 * @param {object} obj
 * @returns {boolean}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
export function isNode(obj) {
	return (
		typeof Node === 'object' ? obj instanceof Node :
		obj && typeof obj === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string'
	)
}
/**
 * Returns true if it is a DOM element
 * @param {object} obj
 * @returns {*}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
export function isElement(obj) {
	return (
		typeof HTMLElement === 'object'
		? obj instanceof HTMLElement
			//DOM2
		: obj
			&& typeof obj === 'object'
			&& obj !== null
			&& obj.nodeType === 1
			&& typeof obj.nodeName === 'string'
	)
}
/**
 * Returns the first matching dom element in el -> ...parent
 * @param {HTMLElement} element
 * @param {string} selector
 * @param {boolean=} check__self
 * @returns {*|Node}
 */
export function closest(selector, element, check__self?:boolean) {
	let __ = check__self
					 ? element
					 : element.parentNode
	while (__ && __ !== document) {
		if (matches(__, selector)) return __
		__ = __.parentNode
	}
}
/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */
function matches(el, selector) {
	const { parentNode } = el
	if (!parentNode) return
	if (selector == el) return true
	if (typeof selector !== 'string') return
	const nodes = __dom(selector, parentNode)
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i] == el) return true
	}
}
let proto
export function _matches__vendor() {
	if (!proto) {
		if (typeof Element === 'undefined') return
		proto = Element.prototype
	}
	return proto.matchesSelector
		|| proto.webkitMatchesSelector
		|| proto.mozMatchesSelector
		|| proto.msMatchesSelector
		|| proto.oMatchesSelector
}
