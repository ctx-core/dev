import { clone } from '@ctx-core/object/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/tree__checkbox/dom.mjs'
export function _change__checkbox__all(key__store, fn) {
	return function __change__checkbox__all(event) {
		log(`${logPrefix}|__change__checkbox__all`, event)
		const { store } = this
		const { currentTarget } = event
		const { checked } = currentTarget
		const selected__BY__item = clone(store.get()[key__store])
		fn.call(this, selected__BY__item, checked)
		store.set({
			[key__store]: selected__BY__item,
		})
	}
}
export function _change__checkbox(key__store) {
	return function __change__checkbox(event, item) {
		log(`${logPrefix}|__change__checkbox`, { event, item })
		const { store } = this
		const { currentTarget } = event
		const { checked } = currentTarget
		const selected__BY__item = clone(store.get()[key__store])
		if (!!(checked) != !!(selected__BY__item[item])) {
			selected__BY__item[item] = checked
			store.set({
				[key__store]: selected__BY__item,
			})
		}
	}
}