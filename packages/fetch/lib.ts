/**
 * Module wrapping the fetch http client for ctx-core
 * @module @ctx-core/fetch/lib
 */
import { sleep } from '@ctx-core/sleep'
import { _number__fibonacci } from '@ctx-core/fibonacci'
import { _no__dom } from '@ctx-core/dom'
import { throw__error } from '@ctx-core/error'
import fetch, { Headers, Request, Response } from 'isomorphic-fetch'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/fetch'
export { fetch, Headers, Request, Response }
export function _headers(init) {
	return _no__dom() ? init : new window.Headers(init)
}
export function _method__fetch(ctx__fetch):string {
	return (ctx__fetch.method || 'GET').toUpperCase()
}
export async function throw__response__fetch(response) {
	log(`${logPrefix}|throw__response__fetch`)
	const error_message = await response.text()
	throw__error({
		status__http: response.status,
		error_message,
	})
}
export async function waitfor__backoff__fibonacci(fn, delay = 500) {
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
export const _waitfor__ratelimit__backoff__fibonacci = waitfor__backoff__fibonacci
