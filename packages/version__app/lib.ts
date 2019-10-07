import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/version__app/lib.ts'
export function _version(ctx?) {
	return (
		(ctx && (ctx.CACHE_VERSION || ctx.VERSION))
		|| process.env.CACHE_VERSION
		|| process.env.VERSION
		|| Math.random()
	)
}
/**
 *
 * @param {*}ctx
 * @param src__script
 * @param opts
 * @returns {string}
 */
export function _versioned__js(ctx, src__script, opts:{ debug?:boolean, minify?:boolean } = {}) {
	const extName = (!opts.debug && ctx.minify) ? '.min.js' : '.js'
	return _versioned(ctx, `${src__script}${extName}`)
}
/**
 * versioned file
 * @param {*}ctx
 * @param {string} url
 * @returns {string}
 */
export function _versioned(ctx, url:string) {
	log(`${logPrefix}|_versioned`)
	return `${url}?${_query__version(ctx)}`
}
/**
 * _versioned with ctx
 * @param {*}ctx
 * @returns {string}
 */
export function __versioned(ctx) {
	log(`${logPrefix}|__versioned`)
	return function _versioned__versioned(url) {
		return _versioned(ctx, url)
	}
}
/**
 * version query param
 * @returns {string}
 */
export function _query__version(ctx) {
	return `v=${encodeURIComponent(_version(ctx))}`
}
