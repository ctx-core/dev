import { get } from 'svelte/store'
import { clone } from '@ctx-core/object'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/tree__checkbox/dom.js'
export function _change__checkbox__all(store, fn) {
	return function __change__checkbox__all(event) {
		log(`${logPrefix}|__change__checkbox__all`, event)
		const { currentTarget } = event
		const { checked } = currentTarget
		const selected__by__item = clone(get(store))
		fn(selected__by__item, checked)
		store.set(selected__by__item)
	}
}
export function _change__checkbox(store) {
	return function __change__checkbox(event, item) {
		log(`${logPrefix}|__change__checkbox`, { event, item })
		const { currentTarget } = event
		const { checked } = currentTarget
		const selected__by__item = clone(get(store))
		if (!!(checked) != !!(selected__by__item[item])) {
			selected__by__item[item] = checked
			store.set(selected__by__item)
		}
	}
}
