import { clone } from '@ctx-core/object/lib.mjs'
import { __store__layers } from './store.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/layer/dom.mjs'
export function mount__layers(tag, ...ARR__ctx__mount) {
	log(`${logPrefix}|mount__layers`)
	const ctx__mount = clone(...ARR__ctx__mount)
	const { el = document.body } = ctx__mount
	const { ctx } = tag
	const { store } = ctx
	__store__layers(store).unshift__layers({
		layers: [{
			zIndex: 0,
			el
		}]
	})
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	let subscription__store
	return tag
	function onmount() {
		log(`${logPrefix}|mount__layers|onmount`)
		const { __changed__layers } = ctx__mount
		if (__changed__layers) {
			subscription__store = store.on('state',
				({ changed, current }) => {
					if (changed.layers) {
						__changed__layers(current)
					}
				})
		}
	}
	function onunmount() {
		log(`${logPrefix}|mount__layers|onunmount`)
		if (subscription__store) subscription__store.cancel()
	}
}