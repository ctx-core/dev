import { assign } from 'ctx-core/object/lib.mjs'
import env from 'ctx-core/env.mjs'
import { _version } from 'ctx-core/version__app/node.mjs'
import { $versioned__js as _versioned__js__ } from 'ctx-core/html/lib.mjs'
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/html/node.mjs'
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
export const $versioned = _versioned
/**
 * version query param
 * @returns {string}
 */
export function _query__version() {
	return `v=${encodeURIComponent(_version())}`
}
export const $query__version = _query__version
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
export const $ctx__html = _ctx__html
export const _ctx__html__core = _ctx__html
export const $ctx__html__core = _ctx__html
