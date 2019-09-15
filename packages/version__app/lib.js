import { log } from '@ctx-core/logger'
export function _version(ctx) {
	return (
		(ctx
			&& (ctx.CACHE_VERSION
				|| ctx.VERSION))
		|| Math.random()
	)
}
/**
 *
 * @param {module:ctx-core/object/lib~ctx}
 * @param src__script
 * @param opts
 * @returns {string}
 */
export function _versioned__js(ctx, src__script, opts = {}) {
	const extName = (!opts.debug && ctx.minify) ? '.min.js' : '.js'
	return _versioned(ctx, `${src__script}${extName}`)
}
/**
 * versioned file
 * @param {module:ctx-core/object/lib~ctx}
 * @param {string} url
 * @returns {string}
 */
export function _versioned(ctx, url) {
	log(`${logPrefix}|_versioned`)
	return `${url}?${_query__version(ctx)}`
}
/**
 * _versioned with ctx
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string}
 */
export function __versioned(ctx) {
	log(`${logPrefix}|__versioned`)
	return function _versioned__versioned() {
		return _versioned(ctx, ...arguments)
	}
}
/**
 * version query param
 * @returns {string}
 */
export function _query__version(ctx) {
	return `v=${encodeURIComponent(_version(ctx))}`
}
