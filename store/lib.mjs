// TODO: Use when https://github.com/sveltejs/svelte-extras/issues/20 is resolved
//import {observe} from 'svelte-extras'
import {observe} from 'svelte-extras/dist/svelte-extras.es.js'
import {assign, mixin, clone} from 'ctx-core/object/lib.mjs'
import __Store from 'svelte/store.umd.js'
const {Store} = __Store
export function _store() {
	const store = new Store(...arguments)
	mixin(store, {
		clone__get() {
			return clone(this.get(), ...arguments)
		},
    set__clone(__set) {
      const state = store.get()
      const __ = {}
      for (let key in __set) {
        __[key] = clone(state[key], __set[key])
      }
      return store.set(__)
    },
		async transaction(fn) {
			const store = mixin(new Store(), this)
			store._state = clone(this._state)
			store._computed = clone(this._computed)
			const __set = {}
			store.set = __set__ => {
				assign(__set, __set__)
				assign(store._state, __set__)
			}
			store._state = clone(store._state)
			await Promise.all([fn(store)])
			this.set(__set)
			return store
		},
		get store() {return this.get().store},
	})
	store.set({store})
	store.observe = observe
	return store
}
export const $store = _store
export function _mixin__store(name, init) {
	return function mixin__store(store) {
		if (store[name]) return store
		store[name] = {
			store,
			name,
			mixin__store
		}
		init(...arguments)
		return store
	}
}
