/**
 * ctx-core version etag functions
 * @module @ctx-core/version__app/etag
 */
import { _Uint32Array__atob } from '@ctx-core/atob'
export const protocol_version = 0
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
	const etag$ = etag.replace('-', '')
	const Uint32Array__atob = _Uint32Array__atob(etag$)
	const protocol_version = Uint32Array__atob[0]
	const CACHE_VERSION = Uint32Array__atob[1]
	const timestamp = Uint32Array__atob[2]
	const ctx__etag = {
		protocol_version,
		CACHE_VERSION,
		timestamp
	}
	return ctx__etag
}
