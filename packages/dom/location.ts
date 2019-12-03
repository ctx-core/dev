import { assign } from '@ctx-core/object'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/dom/url'
export function _hostname() {
	return typeof window === 'object' ? window.location.hostname : null
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
		row_id: value=>parseFloat(value)
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
export function _hash__url__string(url) {
	const index__hash = url.indexOf('#')
	const hash__url__string =
		index__hash != -1
		? url.substring(index__hash + 1)
		: ''
	return hash__url__string
}
export const $hash__url__string = _hash__url__string
