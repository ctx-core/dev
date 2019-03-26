import { throw__error } from '@ctx-core/error'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/promise/lib.js'
export function promise__catch(ctx, promise) {
	log(`${logPrefix}|promise__catch`)
	return promise
		.catch(ctx__error => {
			log(`${logPrefix}|promise__catch|catch`)
			throw__error(ctx, ctx__error)
		})
}
export function _deferred() {
	let resolve
	let reject
	const promise = new Promise((ok, no) => {
		resolve = ok
		reject = no
	})
	promise.resolve = resolve
	promise.reject = reject
	return promise
}