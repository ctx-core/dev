import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/version__app/lib.ts'
export function _version(opts?) {
	return (
		(opts && (opts.CACHE_VERSION || opts.VERSION))
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
export function _versioned__js(src__script, opts?:{ debug?:boolean, minify?:boolean }) {
	const extName = (!opts || !opts.debug) ? '.min.js' : '.js'
	return _versioned(`${src__script}${extName}`, opts)
}
/**
 * versioned file
 * @param {*}ctx
 * @param {string} url
 * @returns {string}
 */
export function _versioned(url:string, opts?) {
	log(`${logPrefix}|_versioned`)
	return `${url}?${_query__version(opts)}`
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
export function _query__version(opts?) {
	return `v=${encodeURIComponent(_version(opts))}`
}
