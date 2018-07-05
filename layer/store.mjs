import { _mixin__store } from 'ctx-core/store/lib.mjs'
import { mixin } from 'ctx-core/object/lib.mjs'
import { last__array, _union__array, _difference__array } from 'ctx-core/array/lib.mjs'
import { throw__invalid_state } from 'ctx-core/error/lib.mjs'
import { log } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/layer/store.mjs'
export const __store__layers = _mixin__store('__store__layers', store => {
	mixin(store, {
		reset__layers() {
			this.set({ layers: [], zIndex__base__layers: 0 })
		},
		load__layers() {
			log(`${logPrefix}|load__layers`)
			if (this.get().layers) return
			log(`${logPrefix}|load__layers|2`)
			this.reset__layers()
		},
		push__layers(...array__layers) {
			log(`${logPrefix}|push__layers`)
			const { zIndex__top__layers } = this
			for (let j = 0; j < array__layers.length; j++) {
				const layer = array__layers[j]
				const { zIndex } = layer
				if (Number.isFinite(zIndex)) {
					if (zIndex__top__layers != null && zIndex <= zIndex__top__layers) {
						throw__invalid_state(this.get(), {
							key: 'layers',
							reason: `zIndex must be greater than store.zIndex__top__layers('layers')`
						})
					}
				} else {
					layer.zIndex = isNaN(zIndex__top__layers) ? this.zIndex__base__layers : zIndex__top__layers + 1
				}
			}
			const layers = this.layers.slice(0)
			layers.push(...array__layers)
			this.set({ layers })
			return this
		},
		unshift__layers(...layers__) {
			log(`${logPrefix}|unshift__layers`)
			this.set({ layers: _union__array(layers__, this.layers || []) })
			return this
		},
		remove__layers(...layers__) {
			log(`${logPrefix}|remove__layers`)
			this.set({ layers: _difference__array(layers__, this.layers.slice(0)) })
			return this
		},
		get layers() {return this.get().layers},
		get top__layers() {return this.get().top__layers},
		get zIndex__base__layers() {return this.get().zIndex__base__layers},
	})
	store.compute('top__layers', ['layers'],
		layers => last__array(layers))
	store.compute('zIndex__base__layers', ['top__layers'],
		top__layers => top && top.zIndex)
	store.reset__layers()
})