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
		/**
		 * TODO: Revisit when https://github.com/sveltejs/svelte/issues/1535 is resolved
		 * @see {@link https://github.com/sveltejs/svelte/issues/1535}
		 */
		async transaction(fn) {
			const store__transaction = mixin(new Store(), this)
			store__transaction._state = clone(this._state)
			store__transaction._computed = clone(this._computed)
			const __set = {}
			store__transaction.set = __set__ => {
				assign(__set, __set__)
				assign(store__transaction._state, __set__)
			}
			store__transaction._state = clone(store__transaction._state)
			await Promise.all([fn(store__transaction)])
			this.set(__set)
			return store__transaction
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
