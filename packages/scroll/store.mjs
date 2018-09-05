import { _mixin__store } from '@ctx-core/store/lib.mjs'
import { mixin, clone } from '@ctx-core/object/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/scroll/store.mjs'
export const __store__active__Sticky__Scroll = _mixin__store('__store__active__Sticky__Scroll', async store => {
	mixin(store, {
		reset__active__Sticky__Scroll() {
			this.set({ active__Sticky__Scroll: {} })
			return this
		},
		add__active__Sticky__Scroll(key) {
			log(`${logPrefix}|add__active__Sticky__Scroll`)
			const active__Sticky__Scroll = clone(this.get().active__Sticky__Scroll)
			active__Sticky__Scroll[key] = true
			this.set({ active__Sticky__Scroll })
			return this
		},
		remove__active__Sticky__Scroll(key) {
			log(`${logPrefix}|remove__active__Sticky__Scroll`)
			const active__Sticky__Scroll = clone(this.get().active__Sticky__Scroll)
			active__Sticky__Scroll[key] = false
			this.set({ active__Sticky__Scroll })
			return this
		},
		_active__active__Sticky__Scroll(key) {
			log(`${logPrefix}|_active__active__Sticky__Scroll`)
			const { active__Sticky__Scroll } = this.get()
			const active =
				active__Sticky__Scroll
				? active__Sticky__Scroll[key]
				: false
			return active
		},
		_match__active__Sticky__Scroll(key, active) {
			return !!(active) == !!(this._active__active__Sticky__Scroll(key))
		},
	})
})