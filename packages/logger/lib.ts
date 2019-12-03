import {
	debug__chalk,
	log__chalk,
	info__chalk,
	warn__chalk,
	error__chalk
} from './chalk'
export function debug(...arg_a1) {
	return debug__chalk(_timestamp(), ...arg_a1)
}
export function log(...arg_a1) {
	return log__chalk(_timestamp(), ...arg_a1)
}
export function info(...arg_a1) {
	return info__chalk(_timestamp(), ...arg_a1)
}
export function warn(...arg_a1) {
	return warn__chalk(_timestamp(), ...arg_a1)
}
export function error(...arg_a1) {
	return error__chalk(_timestamp(), ...arg_a1)
}
export const error__log = error
function _timestamp() {
	return (new Date()).toISOString()
}
export function _log(message, fn) {
	return function (...arg_a1) {
		log(message)
		return fn(...arg_a1)
	}
}
export function _console(fn, ctx__log) {
	return function (...arg_a1) {
		for (let key in ctx__log) {
			console[key](ctx__log[key])
		}
		return fn(...arg_a1)
	}
}
