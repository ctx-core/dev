/**
 * Module wrapping the fetch http client for ctx-core
 * @module @ctx-core/fetch/lib
 */
import { sleep } from '@ctx-core/sleep'
import { _number__fibonacci } from '@ctx-core/fibonacci'
import { _no__dom } from '@ctx-core/dom'
import { throw__error } from '@ctx-core/error'
import fetch from '@ctx-core/isomorphic-fetch'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/fetch'
export { fetch }
export function _headers(init) {
	return _no__dom() ? init : new window.Headers(init)
}
export const Request = _no__dom() ? require('isomorphic-fetch').Request : window.Request
export const Response = _no__dom() ? require('isomorphic-fetch').Response : window.Response
export function _method__fetch(ctx__fetch) {
	return (ctx__fetch.method || 'GET').toUpperCase()
}
export function _url__fetch(ctx__fetch) {
	const { url } = ctx__fetch
	return url
}
export async function throw__response__fetch(response) {
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
