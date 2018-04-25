/**
 * ctx-core version etag functions
 * @module ctx-core/version__app/etag
 */
import env from 'ctx-core/version__app/env.mjs'
import {$Uint32Array__atob} from 'ctx-core/atob/lib.mjs'
import {_now__millis} from 'ctx-core/time/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/version__app/etag.mjs'
export const protocol_version = 0
export function _etag() {
	log(`${logPrefix}|_etag`)
	const {CACHE_VERSION} = env
			, timestamp = _now__millis()
			, $$ = new Uint32Array(6) // 192 bits
}
/**
 * Extracts weak ETag formatted with:
 *
 * - log2(64 ^ 32) ~ 192 bits
 * - {Uint32} protocol version
 * - {Uint32} CACHE_VERSION
 * - {Uint32} timestamp (optional)
 * - 96 bits - rest
 * @param {string} etag - base64 encoded etag format
 */
export function _ctx__etag(etag) {
	log(`${logPrefix}|_ctx__etag`, etag)
	const etag$ = etag.replace('-', '')
			, Uint32Array__atob = $Uint32Array__atob(etag$)
			, protocol_version = Uint32Array__atob[0]
			, CACHE_VERSION = Uint32Array__atob[1]
			, timestamp = Uint32Array__atob[2]
			, ctx__etag = {
					protocol_version,
					CACHE_VERSION,
					timestamp }
	return ctx__etag
}