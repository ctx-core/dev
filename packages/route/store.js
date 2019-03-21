import { writable } from 'svelte/store.mjs'
import { mixin__writable__load } from '@ctx-core/store/lib.js'
import { _router } from './lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/route/store.js'
export const __route = writable('')
export const __query__route = writable({})
export const __router = mixin__writable__load(writable(), [], _router)
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
