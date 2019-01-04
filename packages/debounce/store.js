import { _mixin__store } from '@ctx-core/store/lib.js'
import { mixin } from '@ctx-core/object/lib.js'
export const __store__debounce = _mixin__store('__store__debounce', async store => {
	mixin(store, {
		reset__debounce() {
			this.set({ table__debounce: {} })
		},
		async debounce(opts) {
			const { key, no, yes } = opts
			const { table__debounce } = this.get()
			if (table__debounce[key]) {
				return await no()
			}
			try {
				table__debounce[key] = () => table__debounce[key] = null
				return await yes()
			} finally {
				table__debounce[key]()
			}
		},
		get table__debounce() {return this.get().table__debounce}
	})
	return store.reset__debounce()
})