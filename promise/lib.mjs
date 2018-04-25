import {throw__error} from 'ctx-core/error/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/promise/lib.mjs'
export function promise__catch(ctx, promise) {
	log(`${logPrefix}|promise__catch`)
	return promise
		.catch(ctx__error => {
			log(`${logPrefix}|promise__catch|catch`)
			throw__error(ctx, ctx__error)
		})
}