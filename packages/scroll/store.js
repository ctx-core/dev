import { writable, get } from 'svelte/store'
import { clone } from '@ctx-core/object'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/scroll/store.js'
export const __active__Sticky__Scroll = writable({})
export function add__active__Sticky__Scroll(key) {
	log(`${logPrefix}|add__active__Sticky__Scroll`)
	__active__Sticky__Scroll.update(
		__ => {
			const active__Sticky__Scroll = clone(__)
			active__Sticky__Scroll[key] = true
			return active__Sticky__Scroll
		})
}
export function remove__active__Sticky__Scroll(key) {
	log(`${logPrefix}|remove__active__Sticky__Scroll`)
	__active__Sticky__Scroll.update(
		__ => {
			const active__Sticky__Scroll = clone(__)
			active__Sticky__Scroll[key] = false
			return active__Sticky__Scroll
		})
}
export function _active__active__Sticky__Scroll(key) {
	log(`${logPrefix}|_active__active__Sticky__Scroll`)
	const active__Sticky__Scroll = get(__active__Sticky__Scroll)
	const active =
		active__Sticky__Scroll
		? active__Sticky__Scroll[key]
		: false
	return active
}
export function _match__active__Sticky__Scroll(key, active) {
	return !!(active) == !!(_active__active__Sticky__Scroll(key))
}
