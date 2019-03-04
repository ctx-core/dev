import { writable, derive } from 'svelte/store.mjs'
import { writable__load } from '@ctx-core/store/lib.js'
import { _router } from './lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/route/store.js'
export const route = writable('')
export const query__route = writable({})
export const __route = derive([route, query__route],
	($route, $query__route) => ({
		route: $route,
		query__route: $query__route,
	}))
export const router = writable__load(writable(), [], _router)
export async function ensure__router() {
	let value
	router.update($router => value = ($router || _router()))
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
