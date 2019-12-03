/**
 * btoa helper functions
 * @module @ctx-core/btoa/lib
 */
import { _no__dom } from '@ctx-core/dom'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/btoa/lib.js'
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
		_no__dom()
		? require('btoa-lite')
		: window.btoa
	return btoa
}
export function btoa(...arg_a1:[]) {
  return _btoa(...arg_a1)
}
