import { writable, derive } from 'svelte/store.mjs'
import { mixin } from '@ctx-core/object/lib.js'
import { last__array, _union, _difference } from '@ctx-core/array/lib.js'
import { throw__invalid_state } from '@ctx-core/error/lib.js'
import { log } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/layer/store.js'
export const __layers = writable([])
export function push__layers(...ARR__layers) {
	log(`${logPrefix}|push__layers`)
	const { zIndex__top__layers } = this
	for (let j = 0; j < ARR__layers.length; j++) {
		const layer = ARR__layers[j]
		const { zIndex } = layer
		if (Number.isFinite(zIndex)) {
			if (zIndex__top__layers != null && zIndex <= zIndex__top__layers) {
				throw__invalid_state(this.get(), {
					key: 'layers',
					reason: `zIndex must be greater than store.zIndex__top__layers('layers')`
				})
			}
		} else {
			layer.zIndex = isNaN(zIndex__top__layers)
										 ? this.get().zIndex__base__layers
										 : zIndex__top__layers + 1
		}
	}
	const layers = get(__layers).slice(0)
	layers.push(...ARR__layers)
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
export const __top__layers =
	derive([__layers], layers => last__array(layers))
export const __zIndex__base__layers =
	derive([__top__layers], top__layers => top && top.zIndex)