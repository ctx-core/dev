import {
	debug__chalk,
	log__chalk,
	info__chalk,
	warn__chalk,
	error__chalk} from 'ctx-core/logger/chalk.mjs'
export function debug() {
	return debug__chalk(_timestamp(), ...arguments)
}
export function log() {
	return log__chalk(_timestamp(), ...arguments)
}
export function info() {
	return info__chalk(_timestamp(), ...arguments)
}
export function warn() {
	return warn__chalk(_timestamp(), ...arguments)
}
export function error() {
	return error__chalk(_timestamp(), ...arguments)
}
export const error__log = error
function _timestamp() {
	return (new Date()).toISOString()
}
export function _log(message, fn) {
	return function() {
		log(message)
		return fn.apply(this, arguments)
	}
}
export function _console(fn, ctx__log) {
	return function() {
		for (let key in ctx__log) {
			console[key](ctx__log[key])
		}
		return fn.apply(this, arguments)
	}
}