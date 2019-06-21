/**
 * atob helper functions
 * @module @ctx-core/atob/lib
 */
import { _no__dom } from '@ctx-core/dom'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/atob/lib.js'
export function _Uint32Array__atob(b64) {
	log(`${logPrefix}|_Uint32Array__atob`)
	const atob = _atob()
	const __ = atob(b64)
	const { length } = __
	let Uint32Array__atob = new Uint32Array(length)
	for (let i = 0; i < length; i++) {
		Uint32Array__atob[i] = __.charCodeAt(i)
	}
	return Uint32Array__atob
}
export function _atob() {
	return (
		_no__dom()
		? require('atob-lite')
		: window.atob
	)
}
