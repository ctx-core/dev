import { assign } from '@ctx-core/object/lib.js'
import env from '@ctx-core/env/env.js'
import { _version } from '@ctx-core/version__app/node.js'
import { _versioned__js as _versioned__js__ } from './lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/html/node.js'
export function _versioned__js(src__script, opts = {}) {
	return _versioned__js__(env, src__script, opts)
}
/**
 * versioned file
 * @param {string} url
 * @returns {string}
 */
export function _versioned(url) {
	return `${url}?${_query__version()}`
}
/**
 * version query param
 * @returns {string}
 */
export function _query__version() {
	return `v=${encodeURIComponent(_version())}`
}
/**
 * Returns a new ctx__html
 * @param ctx
 * @param ARR__ctx__html
 * @returns {{}}
 */
export function _ctx__html(ctx, ...ARR__ctx__html) {
	log(`${logPrefix}|_ctx__html`)
	const ctx__html =
		assign({
			CACHE_VERSION: _version(),
			VERSION: ctx.VERSION
		}, ...ARR__ctx__html)
	return ctx__html
}
export const _ctx__html__core = _ctx__html
