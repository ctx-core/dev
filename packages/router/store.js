import { _has__dom } from '@ctx-core/dom'
import { writable } from 'svelte/store'
import { _router } from './lib'
export const __router = writable(_router())
if (_has__dom()) {
	__router.set(_router)
}
export async function ensure__router() {
	let value
	__router.update(router => value = (router || _router()))
	return value
}
export function add__route() {
	ensure__router().add(...arguments)
}
export function listen__router() {
  ensure__router().listen()
}
export function navigate() {
  ensure__router().navigate(...arguments)
}
