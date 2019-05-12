import { writable, derived, get } from 'svelte/store'
import { _last__a1, _union, _difference } from '@ctx-core/array'
import { throw__invalid_state } from '@ctx-core/error'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/layer/store.js'
export const __layers = writable([])
export const __top__layers =
	derived(__layers, layers => _last__a1(layers))
export const __zIndex__top__layers =
	derived(__top__layers,
		top__layers => top__layers && top__layers.zIndex)
export function push__layers(...a1__layers) {
	log(`${logPrefix}|push__layers`)
	const zIndex__top__layers = get(__zIndex__top__layers)
	for (let j = 0; j < a1__layers.length; j++) {
		const layer = a1__layers[j]
		const { zIndex } = layer
		if (Number.isFinite(zIndex)) {
			if (zIndex__top__layers != null && zIndex <= zIndex__top__layers) {
				throw__invalid_state({
					key: 'layers',
					reason: `zIndex must be greater than store.zIndex__top__layers('layers')`
				})
			}
		} else {
			layer.zIndex = isNaN(zIndex__top__layers)
										 ? zIndex__base__layers
										 : zIndex__top__layers + 1
		}
	}
	const layers = get(__layers).slice(0)
	layers.push(...a1__layers)
	__layers.set(layers)
}
export function unshift__layers(...layers__) {
	log(`${logPrefix}|unshift__layers`)
	__layers.set(_union(layers__, get(__layers) || []))
}
export function remove__layers(...layers__) {
	log(`${logPrefix}|remove__layers`)
	__layers.set(_difference(layers__, get(__layers).slice(0)))
}
