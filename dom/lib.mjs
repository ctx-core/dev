/**
 * dom library
 * @module ctx-core/dom/lib
 */
/**
 * DOM Node
 * @typedef Node
 */
/**
 * DOM HTMLElement
 * @typedef {module:ctx-core/dom/lib~Node} HTMLElement
 */
/**
 * DOM NodeList
 * @typedef NodeList
 */
import {assign} from 'ctx-core/object/lib.mjs'
import {log,warn,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/dom/lib.mjs'
export function has__dom() {
	return typeof window === 'object'
}
export function no__dom() {
	return typeof window === 'undefined'
}
/**
 * The first matching HTMLElement from the selector
 * @param {string} selector - the DOM query selector
 * @param {module:ctx-core/dom/lib~HTMLElement} parent
 * @returns {module:ctx-core/dom/lib~HTMLElement} the first HTMLElement matching the selector
 */
export function _dom(selector, parent) {
	return (parent || document).querySelector(selector)
}
export const $dom = _dom
/**
 * The first matching HTMLElement from the selector
 *
 * - If selector is an object, return selector.
 * @param {string,object} selector - the DOM query selector
 * @param {module:ctx-core/dom/lib~HTMLElement} parent
 * @returns {module:ctx-core/dom/lib~HTMLElement} the first HTMLElement matching the selector
 */
export function _dom2(selector) {
	if (typeof selector === 'object') return selector
	return _dom(...arguments)
}
export const $dom2 = _dom2
/**
 * All matching HTMLElements from the selector
 * @param {string} selector - the DOM query selector
 * @param {module:ctx-core/dom/lib~HTMLElement} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function __dom(selector, parent) {
	return (parent || document).querySelectorAll(selector)
}
export const $$dom = __dom
/**
 * All matching HTMLElements from the selector.
 *
 * - If selector is an object, return selector.
 * @param {string,object} selector - the DOM query selector
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export function __dom2(selector) {
	if (typeof selector === 'object') return selector
	return __dom(...arguments)
}
export const $$dom2 = __dom2
/**
 * Returns true if it is a DOM node
 * @param {object} obj
 * @returns {boolean}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
function isNode(obj) {
	return (
		typeof Node === "object" ? obj instanceof Node :
		obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
	)
}
/**
 * Returns true if it is a DOM element
 * @param {object} obj
 * @returns {*}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
function isElement(obj) {
	return (
		typeof HTMLElement === "object"
		? obj instanceof HTMLElement
		//DOM2
		: obj
			&& typeof obj === "object"
			&& obj !== null
			&& obj.nodeType === 1
			&& typeof obj.nodeName==="string"
)
}/**
 * Returns the first matching dom element in el -> ...parent
 * @param {module:ctx-core/dom/lib~HTMLElement} element
 * @param {string} selector
 * @param {boolean} check__self
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
	const {parentNode} = el
	if (!parentNode) return
	if (selector == el) return true
	if (typeof selector !== 'string') return
	const nodes = __dom(selector, parentNode)
	for (let i=0; i < nodes.length; i++) {
		if (nodes[i] == el) return true
	}
}
let proto
function _matches__vendor() {
	if (!proto) {
		if (typeof Element === 'undefined') return
		proto = Element.prototype
	}
	return	proto.matchesSelector
					|| proto.webkitMatchesSelector
					|| proto.mozMatchesSelector
					|| proto.msMatchesSelector
					|| proto.oMatchesSelector
}
export const $matches__vendor = _matches__vendor
export function offset(el) {
	log(`${logPrefix}|offset`)
	let top = 0
		, left = 0
	do {
		top += el.offsetTop	 || 0
		left += el.offsetLeft || 0
		el = el.offsetParent
	} while(el)

	return {top, left}
}
/**
 * Is the HTMLElement hidden?
 * @param {module:ctx-core/dom/lib~HTMLElement} el
 * @returns {boolean} true if `el` is hidden
 */
export function is_hidden(el) {
	return !(el.offsetParent)
}
/**
 * Is the HTMLElement visible?
 * @param {module:ctx-core/dom/lib~HTMLElement} el
 * @returns {boolean} true if `el` is visible
 */
export function is_visible(el) {
	return !!(el.offsetParent)
}
/**
 * Calls document.registerElement if the element is not already registered
 * @param {string} name__element
 * @returns {function} The {@link module:ctx-core/dom/lib~HTMLElement} constructor
 */
export function registerElement(ctx, name__element) {
	log(`${logPrefix}|registerElement`)
	let constructor = constructor__element(name__element)
	if (document.registerElement && !constructor) {
		constructor = document.registerElement(...arguments)
	}
	ensure__registeredElements(ctx)
	ctx.registeredElements.push(name__element)
	return constructor
}
/**
 * Ensures `ctx.registerElements` is defined
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {module:ctx-core/object/lib~ctx}
 */
export function ensure__registeredElements(ctx) {
	if (!ctx.registeredElements) ctx.registeredElements = []
	return ctx
}
/**
 * Is name__element registered in the DOM?
 * @param {string} name__element
 * @returns {boolean} true if name__element is registered in the dom
 */
export function isRegistered__element(name__element) {
	log(`${logPrefix}|isRegistered__element`)
	return constructor__element(name__element) !== HTMLElement
}
/**
 * The constructor for DOM element name__element
 * @param {string} name__element
 * @returns {Function} The {@link module:ctx-core/dom/lib~HTMLElement} constructor
 */
export function constructor__element(name__element) {
	log(`${logPrefix}|constructor__element`)
	return document.createElement(name__element).constructor
}
/**
 * The ctx from the query params in `window.location.hash` formatted as a url
 * @typedef {module:ctx-core/object/lib~ctx} query__hash__location
 */
/**
 * Returns an query__hash__location
 * @param {Object.<string,function>} ctx__transform- Transform Functions for the `window.location.anchor` query params
 * @returns {module:ctx-core/dom/lib~query__hash__location}
 * @example
 * $query__hash__location({
 *	 id: parseInt
 * })
 */
export function _query__hash__location(ctx__transform) {
	log(`${logPrefix}|$query__hash__location`)
	ctx__transform = assign({
		row_id: (value, key) => parseFloat(value)
	}, ctx__transform)
	const hash__url__string =
					$hash__url__string(window.location.href)
			, decodeURIComponent__hash__url__string =
					decodeURIComponent(hash__url__string)
	let query__hash__location = {}
		, array__query__hash__location
	if (decodeURIComponent__hash__url__string) {
		array__query__hash__location =
			decodeURIComponent__hash__url__string.split('&')
		decodeURIComponent__query__hash__location()
		split__query__hash__location()
		reduce(array__query__hash__location)
	}
	return query__hash__location
	function decodeURIComponent__query__hash__location() {
		let array__query__hash__location__ = []
		for (let i=0; i < array__query__hash__location.length; i++) {
			array__query__hash__location__.push(
				decodeURIComponent(
					array__query__hash__location[i]))
		}
		array__query__hash__location = array__query__hash__location__
		return array__query__hash__location__
	}
	function split__query__hash__location() {
		let array__query__hash__location__ = []
		for (let i=0; i < array__query__hash__location.length; i++) {
			const uriComponent = array__query__hash__location[i]
			array__query__hash__location__.push(
				uriComponent.split('='))
		}
		array__query__hash__location = array__query__hash__location__
		return array__query__hash__location__
	}
	function reduce(_query__hash__location) {
		for (let i=0; i < _query__hash__location.length; i++) {
			const array__uriPart = _query__hash__location[i]
					, key = array__uriPart[0]
					, value = array__uriPart[1]
					, transform = ctx__transform[key]
					, value_transform =
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
 * assign the query params from `window.location.hash` to the `ctx`
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/object/lib~ctx} opts - The rest of the assigned `ctx`
 */
export function assign__query__hash__location() {
	log(`${logPrefix}|assign__query__hash__location`)
	if (no__dom()) return {}
	let ctx = assign__query__hash__location({}, $query__hash__location(), ...arguments)
		, array__hash = []
	for (let key in ctx) {
		array__hash.push(
			`${encodeURIComponent(key)}=${encodeURIComponent(ctx[key])}`)
	}
	const hash = array__hash.join('&')
	window.location.hash = hash
	return ctx
}
/**
 * Scroll to the top of the parentElement
 * @param {module:ctx-core/dom/lib~Node} el
 * @param {boolean} [scrollWindow=true]
 * @returns {module:ctx-core/dom/lib~Node}
 */
export function scrollTop(el, scrollWindow = true) {
	log(`${logPrefix}|scrollTop`)
	if (no__dom()) return el
	if (scrollWindow) window.scrollTo(0, 0)
	el.scrollTop = 0
	const {parentElement} = el
	if (parentElement) scrollTop(parentElement, false)
	return el
}

/**
 * Returns the `[left, top]` offset position of the given el
 * @param {module:ctx-core/dom/lib~HTMLElement} el
 * @returns {[number, number]}
 */
export function _xy__offset(el) {
	let left = el.offsetLeft
		, top = el.offsetTop
	while (el=el.offsetParent) {
		left += el.offsetLeft
		top += el.offsetTop
	}
	return [left,top]
}
export const $xy__offset = _xy__offset
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
	const {checked} = el
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
			, hash__url__string =
					index__hash != -1
					? url.substring(index__hash+1)
					: ''
	return hash__url__string
}
export const $hash__url__string = _hash__url__string
export function _BoundingClientRect(el) {
	const { top
				, bottom
				, left
				, right
				, height
				, width
				, length
				} = el.getBoundingClientRect()
	return { top, bottom, left, right, height, width, length }
}