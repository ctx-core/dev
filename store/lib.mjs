// TODO: Use when https://github.com/sveltejs/svelte-extras/issues/20 is resolved
//import {observe} from 'svelte-extras'
import {mixin, clone} from 'ctx-core/object/lib.mjs'
import {observe} from 'svelte-extras/dist/svelte-extras.es.js'
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
    }
	})
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
