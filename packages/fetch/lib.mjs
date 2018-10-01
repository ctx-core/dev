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
import { assign, clone, ensure } from '@ctx-core/object/lib.mjs'
import { concat__array } from '@ctx-core/array/lib.mjs'
import { sleep } from '@ctx-core/sleep/lib.mjs'
import { _number__fibonacci } from '@ctx-core/fibonacci/lib.mjs'
import { throw__error } from '@ctx-core/error/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/fetch/lib.mjs'
let FN__fetch
export async function fetch() {
	if (!FN__fetch) FN__fetch = await _fetch()
	return FN__fetch(...arguments)
}
export const fetch2 = _fetch2()
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
 * Creates a new fetch api function that returns a {@link Promise}.
 * @return {Fetch}
 * @todo: Remove wrapping logic & use bare-bones fetch where possible
 */
export function _fetch2() {
	return assign(fetch2, {
		_ctx__fetch,
		ensure__headers,
		get__http,
		put__http,
		post__http,
		delete__http,
		patch__http
	}, ...arguments)
	function fetch2(ctx) {
		log(`${logPrefix}|fetch2`)
		const ctx__fetch = fetch2._ctx__fetch(...arguments)
		if (!ctx__fetch.url && !ctx__fetch.path) {
			throw__error(ctx__fetch, { error_message: 'no url or path defined' })
		}
		const method = _method__fetch(ctx__fetch)
		const url = _url__fetch(ctx__fetch)
		const { body } = ctx__fetch
		assign(ctx__fetch, {
			method,
			url,
			body
		})
		fetch2.ensure__headers(ctx__fetch, ctx)
		if (!('rejectUnauthorized' in ctx__fetch)) ctx__fetch.rejectUnauthorized = false
		log(`${logPrefix}|fetch2|1`, `${ctx__fetch.method} ${url}`, ctx__fetch.rejectUnauthorized)
		return fetch(url, ctx__fetch).catch(_catch__fetch2(ctx__fetch))
	}
	function _catch__fetch2(ctx__fetch) {
		return (ctx__error) => {
			assign(ctx__error, { error_message: ctx__error.toString() })
			throw__error(ctx__fetch, ctx__error)
		}
	}
	/**
	 * HTTP GET generator function
	 * @function get__http
	 * @memberof Fetch
	 * @param {ctx} ctx
	 * @param {...ctx__fetch} ctx__fetch
	 * @returns {ctx__fetch}
	 */
	async function get__http(ctx, ...ARR__ctx__fetch) {
		log(`${logPrefix}|get__http`)
		return fetch2(ctx, ...(concat__array(ARR__ctx__fetch, { method: 'GET' })))
	}
	/**
	 * HTTP PUT generator function
	 * @function put__http
	 * @memberof Fetch
	 * @param {ctx} ctx
	 * @param {...ctx__fetch} ctx__fetch
	 * @returns {ctx__fetch}
	 */
	async function put__http(ctx, ...ARR__ctx__fetch) {
		log(`${logPrefix}|put__http`)
		return fetch2(ctx, ...(concat__array(ARR__ctx__fetch, { method: 'PUT' })))
	}
	/**
	 * HTTP POST generator function
	 * @function post__http
	 * @memberof Fetch
	 * @param {ctx} ctx
	 * @param {...ctx__fetch} ctx__fetch
	 * @returns {ctx__fetch}
	 */
	async function post__http(ctx, ...ARR__ctx__fetch) {
		log(`${logPrefix}|post__http`)
		return fetch2(ctx, ...(concat__array(ARR__ctx__fetch, { method: 'POST' })))
	}
	/**
	 * HTTP DELETE generator function
	 * @function delete__http
	 * @memberof Fetch
	 * @param {ctx} ctx
	 * @param {...ctx__fetch} ctx__fetch
	 * @returns {ctx__fetch}
	 */
	async function delete__http(ctx, ...ARR__ctx__fetch) {
		log(`${logPrefix}|delete__http`)
		return fetch2(ctx, ...(concat__array(ARR__ctx__fetch, { method: 'DELETE' })))
	}
	/**
	 * HTTP PATCH generator function
	 * @function patch__http
	 * @memberof Fetch
	 * @param {ctx} ctx
	 * @param {...ctx__fetch} ctx__fetch
	 * @returns {ctx__fetch}
	 */
	async function patch__http(ctx, ...ARR__ctx__fetch) {
		log(`${logPrefix}|patch__http`)
		return fetch2(ctx, ...(concat__array(ARR__ctx__fetch, { method: 'PATCH' })))
	}
}
/**
 * Clones a new ctx__fetch from arguments
 * @function _ctx__fetch
 * @memberof Fetch
 * @param {...ctx} ctx - cloned ctx
 * @return {ctx__fetch}
 */
export function _ctx__fetch(ctx, ...ARR__ctx__fetch) {
	return clone(...ARR__ctx__fetch)
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
	throw__error(ctx, {
		status__http: response.status,
		error_message
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