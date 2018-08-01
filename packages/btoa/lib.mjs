/**
 * btoa helper functions
 * @module ctx-core/btoa/lib
 */
import { no__dom } from '@ctx-core/dom/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/btoa/lib.mjs'
export function _Uint32Array__btoa(b64) {
	log(`${logPrefix}|_Uint32Array__btoa`)
	const btoa = _btoa()
	const $ = btoa(b64)
	const { length } = $
	let Uint32Array__btoa = new Uint32Array(length)
	for (let i = 0; i < length; i++) {
		Uint32Array__btoa[i] = $.charCodeAt(i)
	}
	return Uint32Array__btoa
}
export function _btoa() {
	const btoa =
		no__dom()
		? require('btoa-lite')
		: window.btoa
	return btoa
}