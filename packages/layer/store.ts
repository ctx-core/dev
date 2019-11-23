import { writable, derived, get } from 'svelte/store'
import { _last__a1, _union, _difference } from '@ctx-core/array'
import { throw__invalid_state } from '@ctx-core/error'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/layer/store.js'
export const __a1__layer = writable([])
export const __top__layer =
	derived(__a1__layer, layers=>_last__a1(layers))
export const __zIndex__top__layer =
	derived(__top__layer,
		top__layer=>top__layer && top__layer.zIndex)
export function push__a1__layer(...a1__a1__layer) {
	log(`${logPrefix}|push__a1__layer`)
	const zIndex__top__layer = get(__zIndex__top__layer)
	for (let j = 0; j < a1__a1__layer.length; j++) {
		const layer = a1__a1__layer[j]
		const { zIndex } = layer
		if (Number.isFinite(zIndex)) {
			if (zIndex__top__layer != null && zIndex <= zIndex__top__layer) {
				throw__invalid_state({
					key: 'layers',
					reason: `zIndex must be greater than store.zIndex__top__layer('layers')`
				})
			}
		} else {
			layer.zIndex =
				isNaN(zIndex__top__layer)
				? 1
				: zIndex__top__layer + 1
		}
	}
	const layers = get(__a1__layer).slice(0)
	layers.push(...a1__a1__layer)
	__a1__layer.set(layers)
}
export function unshift__a1__layer(...a1__layer__) {
	log(`${logPrefix}|unshift__a1__layer`)
	__a1__layer.set(_union([a1__layer__, get(__a1__layer) || []]))
}
export function remove__a1__layer(...a1__layer__) {
	log(`${logPrefix}|remove__a1__layer`)
	__a1__layer.set(_difference([a1__layer__, get(__a1__layer).slice(0)]))
}
