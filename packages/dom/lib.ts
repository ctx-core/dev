/**
 * dom library
 * @module @ctx-core/dom/lib.js
 */
/**
 * DOM Node
 * @typedef Node
 */
/**
 * DOM HTMLElement
 * @typedef {Node} HTMLElement
 */
/**
 * DOM NodeList
 * @typedef NodeList
 */
import { assign } from '@ctx-core/object'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/dom'
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
export function _dom(selector, parent) {
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
export function _dom2(selector, parent) {
	if (typeof selector === 'object') return selector
	return _dom(selector, parent)
}
/**
 * All matching HTMLElements from the selector
 * @param {string} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function _a1__dom(selector, parent) {
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
export function __dom2(selector, parent) {
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
export function closest(selector, element, check__self) {
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
 * The constructor for DOM element name__element
 * @param {string} name__element
 * @returns {Function} The {@link HTMLElement} constructor
 */
export function constructor__element(name__element) {
	log(`${logPrefix}|constructor__element`)
	return document.createElement(name__element).constructor
}
/**
 * The ctx from the query params in `window.location.hash` formatted as a url
 * @typedef {ctx} query__hash__location
 */
/**
 * Returns an query__hash__location
 * @param {Object.<string,function>} ctx__transform- Transform Functions for the `window.location.anchor` query params
 * @returns {query__hash__location}
 * @example
 * $query__hash__location({
 *	 id: parseInt
 * })
 */
export function _query__hash__location(ctx__transform) {
	log(`${logPrefix}|$query__hash__location`)
	ctx__transform = assign({
		row_id: value => parseFloat(value)
	}, ctx__transform)
	const hash__url__string =
		$hash__url__string(window.location.href)
	const decodeURIComponent__hash__url__string =
		decodeURIComponent(hash__url__string)
	let query__hash__location = {}
	let a1__query__hash__location
	if (decodeURIComponent__hash__url__string) {
		a1__query__hash__location =
			decodeURIComponent__hash__url__string.split('&')
		decodeURIComponent__query__hash__location()
		split__query__hash__location()
		reduce(a1__query__hash__location)
	}
	return query__hash__location
	function decodeURIComponent__query__hash__location() {
		let a1__query__hash__location__ = []
		for (let i = 0; i < a1__query__hash__location.length; i++) {
			a1__query__hash__location__.push(
				decodeURIComponent(
					a1__query__hash__location[i]))
		}
		a1__query__hash__location = a1__query__hash__location__
		return a1__query__hash__location__
	}
	function split__query__hash__location() {
		let a1__query__hash__location__ = []
		for (let i = 0; i < a1__query__hash__location.length; i++) {
			const uriComponent = a1__query__hash__location[i]
			a1__query__hash__location__.push(
				uriComponent.split('='))
		}
		a1__query__hash__location = a1__query__hash__location__
		return a1__query__hash__location__
	}
	function reduce(_query__hash__location) {
		for (let i = 0; i < _query__hash__location.length; i++) {
			const a1__uriPart = _query__hash__location[i]
			const key = a1__uriPart[0]
			const value = a1__uriPart[1]
			const transform = ctx__transform[key]
			const value_transform =
				transform
				? transform(value, key)
				: value
			query__hash__location[key] = value_transform
		}
		return query__hash__location
	}
}
export const $query__hash__location = _query__hash__location
/**
 * Scroll to the top of the parentElement
 * @param {Node} el
 * @param {boolean=} scrollWindow=true
 * @returns {Node}
 */
export function scrollTop(el, scrollWindow = true) {
	log(`${logPrefix}|scrollTop`)
	if (_no__dom()) return el
	if (scrollWindow) window.scrollTo(0, 0)
	el.scrollTop = 0
	const { parentElement } = el
	if (parentElement) scrollTop(parentElement, false)
	return el
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
/**
 * Remove hash from `window.location.href` without refreshing the page
 */
export function empty__location__window() {
	log(`${logPrefix}|empty__location__window`)
	window.location.replace('#')
	if (typeof window.history.replaceState == 'function') {
		history.replaceState({}, '', window.location.href.slice(0, -1))
	}
}
export function contains__class(el, class_name) {
	return el.classList.contains(class_name)
}
export const has__class = contains__class
export function set__class(el, class_name, value) {
	let op = value ? 'add' : 'remove'
	return el.classList[op](class_name)
}
export function add__class(el, class_name) {
	return el.classList.add(class_name)
}
export function toggle__class(el, class_name) {
	return el.classList.toggle(class_name)
}
export function remove__class(el, class_name) {
	return el.classList.remove(class_name)
}
export function check__element(el) {
	log(`${logPrefix}|check__element`)
	const { checked } = el
	if (!checked) {
		el.checked = true
	}
	const click__event = document.createEvent('HTMLEvents')
	click__event.initEvent('click', true, false)
	el.dispatchEvent(click__event)
	if (!checked) {
		const change__event = document.createEvent('HTMLEvents')
		change__event.initEvent('change', true, false)
		el.dispatchEvent(change__event)
	}
	return el
}
export function _hash__url__string(url) {
	const index__hash = url.indexOf('#')
	const hash__url__string =
		index__hash != -1
		? url.substring(index__hash + 1)
		: ''
	return hash__url__string
}
export const $hash__url__string = _hash__url__string
export function _BoundingClientRect(el) {
	const {
		top,
		bottom,
		left,
		right,
		height,
		width,
		length
	} = el.getBoundingClientRect()
	return { top, bottom, left, right, height, width, length }
}
export function __click__anchor__scroll(event, root) {
	log(`${logPrefix}|__click__anchor__scroll`, event)
	event.preventDefault()
	const { currentTarget } = event
	const href = currentTarget.getAttribute('href')
	anchor__scroll(href, root)
}
export function anchor__scroll(href, root) {
	const target__href = _dom(href, root)
	if (target__href) {
		target__href.scrollIntoView()
		window.location.hash = href
	}
}
export function scrollIntoView__child__collection(parent, child) {
	const { top, height } = parent.getBoundingClientRect()
	const bottom = top + height
	const { top: top__child, height: height__child } = child.getBoundingClientRect()
	const bottom__child = top__child + height__child
	if (top__child < top) {
		child.scrollIntoView(true)
	} else if (bottom__child > bottom) {
		child.scrollIntoView({ block: 'end' })
	}
}
export function _hostname() {
	return typeof window === 'object' ? window.location.hostname : null
}
export function _bcr__scroll(node, scroll_node = document.documentElement) {
	if (!scroll_node) return
	const bcr = node.getBoundingClientRect()
	const { scrollLeft, scrollTop } = scroll_node
	return {
		top: bcr.top + scrollTop,
		right: bcr.right - scrollLeft,
		bottom: bcr.bottom - scrollTop,
		left: bcr.left + scrollLeft,
		height: bcr.height,
		width: bcr.width,
		x: bcr.x,
		y: bcr.y,
	}
}
export function _bcr__offset(node) {
	const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = node
	return {
		top: offsetTop,
		right: offsetLeft + offsetWidth,
		bottom: offsetTop + offsetHeight,
		left: offsetLeft,
		height: offsetHeight,
		width: offsetWidth,
		x: offsetLeft,
		y: offsetTop,
	}
}
export function trigger__native_event(node, event_name, bubbles = true, cancelable = false) {
	const event = document.createEvent('HTMLEvents')
	event.initEvent(event_name, bubbles, cancelable)
	node.dispatchEvent(event)
	return event
}
export function trigger__custom_event(node, event_name, detail = {}) {
	let event
	if (window.CustomEvent) {
		event = new CustomEvent(event_name, { detail })
	} else {
		event = document.createEvent('CustomEvent')
		event.initCustomEvent(event_name, true, true, detail)
	}
	node.dispatchEvent(event)
	return event
}
