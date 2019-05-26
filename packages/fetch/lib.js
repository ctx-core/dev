/**
 * Module wrapping the fetch http client for ctx-core
 * @module @ctx-core/fetch/lib
 */
/**
 * @typedef {Object} fetch$response
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response}
 */
/**
 * ctx used by Fetch function
 * @typedef {ctx__fetch} ctx__fetch
 * @property {string} method - HTTP method
 * @property {string} url - HTTP url
 * @property {object} headers - HTTP headers
 * @property {string} body - HTTP body
 * @property {fetch$response} response - The fetch response
 */
/**
 * Fetch API function with decorated methods.
 * @namespace fetch
 * @function fetch
 * @static
 * @param {...{module:ctx-core/fetch/lib~ctx__fetch}} ctx__fetch
 * @return {Promise<module:ctx-core/fetch/lib~ctx__fetch>}
 * @property {Fetch._ctx__fetch} _ctx__fetch
 * @property {Fetch.ensure__headers} ensure__headers
 * @property {Fetch.get__http} get__http - HTTP GET generator
 * @property {Fetch.put__http} put__http - HTTP PUT generator
 * @property {Fetch.post__http} post__http - HTTP POST generator
 * @property {Fetch.delete__http} delete__http - HTTP DELETE generator
 * @property {Fetch.patch__http} patch__http - HTTP PATCH generator
 */
import { assign, clone, ensure } from '@ctx-core/object'
import { concat__a1 } from '@ctx-core/array'
import { sleep } from '@ctx-core/sleep'
import { _number__fibonacci } from '@ctx-core/fibonacci'
import { throw__error } from '@ctx-core/error'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/fetch'
let FN__fetch
export async function fetch() {
	if (!FN__fetch) FN__fetch = await _fetch()
	return FN__fetch(...arguments)
}
export async function _fetch() {
	return (
		(typeof window === 'undefined')
		? require('isomorphic-fetch')
		: window.fetch
	)
}
export const Response =
	(typeof window === 'undefined')
	? require('isomorphic-fetch').Response
	: window.Response
export function _headers(init) {
	return (typeof window === 'undefined') ? init : new window.Headers(init)
}
export const Request = (typeof window === 'undefined') ? require('isomorphic-fetch').Request : window.Request
/**
 * Clones a new ctx__fetch from arguments
 * @function _ctx__fetch
 * @memberof Fetch
 * @param {...ctx} ctx - cloned ctx
 * @return {ctx__fetch}
 */
export function _ctx__fetch(ctx, ...a1__ctx__fetch) {
	return clone(...a1__ctx__fetch)
}
export function _method__fetch() {
	const ctx__fetch = assign(...arguments)
	return (ctx__fetch.method || 'GET').toUpperCase()
}
export function _url__fetch() {
	const ctx__fetch = assign(...arguments)
	const { url } = ctx__fetch
	return url
}
/**
 * Assigns http headers for fetch2 http request
 * @function ensure__headers
 * @memberof Fetch
 * @param {ctx__fetch} ctx__fetch
 * @param {...HTTP__Headers} headers
 * @returns {ctx__fetch}
 */
export function ensure__headers(ctx__fetch, ctx) {
	ensure(ctx__fetch.headers || {}, ctx.headers || {})
	return ctx__fetch
}
export async function throw__response__fetch(ctx, response) {
	log(`${logPrefix}|throw__response__fetch`)
	const error_message = await response.text()
	throw__error({
		status__http: response.status,
		error_message,
	})
}
export async function _waitfor__ratelimit__backoff__fibonacci(fn, delay = 500) {
	let response
	let n__delay = 1
	while (true) {
		response = await fn()
		if (response.status === 429) {
			const number__fibonacci = _number__fibonacci(n__delay)
			const delay__ = number__fibonacci * 500
			delay = delay + delay__
			await sleep(delay)
			n__delay++
			continue
		}
		return response
	}
}
